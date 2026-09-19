import { sendRecoveryEmail } from "../send-recovery-email";
import * as postmark from "postmark";

jest.mock("postmark");

describe("sendRecoveryEmail", () => {
  const mockSendEmail = jest.fn();
  const mockServerClient = postmark.ServerClient as jest.MockedClass<typeof postmark.ServerClient>;

  beforeEach(() => {
    jest.clearAllMocks();
    mockServerClient.mockImplementation(() => {
      return {
        sendEmail: mockSendEmail,
      } as unknown as postmark.ServerClient;
    });
    process.env.POSTMARK_SERVER_TOKEN = "fake-postmark-token";
  });

  it("sends recovery email for 2 tracks with correct pricing and checkout URL", async () => {
    const fakeResponse = { MessageID: "12345", To: "artist@example.com" };
    mockSendEmail.mockResolvedValueOnce(fakeResponse);

    const result = await sendRecoveryEmail("artist@example.com", "MC Fest", 2);

    expect(mockServerClient).toHaveBeenCalledWith("fake-postmark-token");
    expect(mockSendEmail).toHaveBeenCalledTimes(1);

    const callArgs = mockSendEmail.mock.calls[0][0];
    expect(callArgs.To).toBe("artist@example.com");
    expect(callArgs.From).toBe("info@hunchofest.com");
    expect(callArgs.Subject).toBe("Complete Your Registration - Huncho Fest 2026");
    expect(callArgs.MessageStream).toBe("outbound");
    expect(callArgs.HtmlBody).toContain("https://square.link/u/FmIxZoXc?src=sheet");
    expect(callArgs.HtmlBody).toContain("$100 for 2 tracks");
    expect(callArgs.HtmlBody).toContain("MC Fest");

    expect(result).toEqual({ success: true, data: fakeResponse });
  });

  it("sends recovery email for 1 track with correct pricing and checkout URL", async () => {
    const fakeResponse = { MessageID: "67890", To: "single@example.com" };
    mockSendEmail.mockResolvedValueOnce(fakeResponse);

    const result = await sendRecoveryEmail("single@example.com", "Solo Artist", 1);

    expect(mockSendEmail).toHaveBeenCalledTimes(1);

    const callArgs = mockSendEmail.mock.calls[0][0];
    expect(callArgs.To).toBe("single@example.com");
    expect(callArgs.HtmlBody).toContain("https://square.link/u/hy2YzQ0o?src=sheet");
    expect(callArgs.HtmlBody).toContain("$60 for 1 track");
    expect(callArgs.HtmlBody).toContain("Solo Artist");

    expect(result).toEqual({ success: true, data: fakeResponse });
  });

  it("falls back to empty string when POSTMARK_SERVER_TOKEN is not set", async () => {
    delete process.env.POSTMARK_SERVER_TOKEN;
    mockSendEmail.mockResolvedValueOnce({});

    await sendRecoveryEmail("test@example.com", "Test User", 1);

    expect(mockServerClient).toHaveBeenCalledWith("");
  });

  it("handles errors gracefully and returns success: false with error object", async () => {
    const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => {});
    const sendError = new Error("Postmark API error");
    mockSendEmail.mockRejectedValueOnce(sendError);

    const result = await sendRecoveryEmail("error@example.com", "Fail Test", 1);

    expect(result).toEqual({ success: false, error: sendError });
    expect(consoleErrorSpy).toHaveBeenCalledWith("Failed to send recovery email:", sendError);

    consoleErrorSpy.mockRestore();
  });
});

import Router, { useRouter } from "next/router";

// Router does not exist serverSide, so need to mock it
export function mockRouter(queryResponse: any = {}): void {
  (useRouter as any) = jest.fn().mockReturnValue({
    query: queryResponse,
  });
  const mockedRouter = {
    push: jest.fn(),
    prefetch: jest.fn(),
    query: jest.fn().mockReturnValue(queryResponse),
  };
  (Router.router as any) = mockedRouter;
}

// fetch only exists in the browser, jest runs on node
export function mockFetch(response: any = {}): void {
  (global as any).fetch = jest.fn().mockReturnValue({
    json: (): Promise<any> => Promise.resolve(response),
    status: 200,
  });
}

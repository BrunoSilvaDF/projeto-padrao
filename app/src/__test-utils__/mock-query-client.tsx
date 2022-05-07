import React from 'react'
import { QueryClientProvider, QueryClientProviderProps, QueryClient } from 'react-query'

type MockQueryClientProps = Omit<QueryClientProviderProps, 'client'>

export const MockQueryClient: Component<MockQueryClientProps> = ({ children, ...props }) => {
  return (
    <QueryClientProvider
      {...props}
      client={
        new QueryClient({
          defaultOptions: {
            queries: {
              // turns retries off
              retry: false,
            },
          },
        })
      }
    >
      {children}
    </QueryClientProvider>
  )
}

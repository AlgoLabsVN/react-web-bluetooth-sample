import { ChakraProvider, Center, Text, Button, Stack } from "@chakra-ui/react";
import { useWeightIND236 } from "./hooks/use-weight-ind236";
import theme from "./theme";

export const App = () => {
  const { connect, disconnect, isConnected, weight } = useWeightIND236();

  return (
    <ChakraProvider theme={theme}>
      <Center height={"100vh"}>
        <Stack>
          {isConnected ? (
            <>
              <Text fontSize="5xl">{weight}</Text>
              <Button onClick={disconnect} colorScheme="pink" size="lg">
                Disconnect
              </Button>
            </>
          ) : (
            <Button onClick={connect} colorScheme="pink" size="lg">
              Connect
            </Button>
          )}
        </Stack>
      </Center>
    </ChakraProvider>
  );
};

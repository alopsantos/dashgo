import { Flex, Text, Box, Avatar } from "@chakra-ui/react";
export default function Profile() {
  return (
    <Flex align="center">
      <Box mr="4" textAlign="right">
        <Text>Anderson Lopes</Text>
        <Text color="gray.300" fontSize="small">
          anderson@lopscorp.com
        </Text>
      </Box>

      <Avatar
        size="md"
        name="Anderson Lopes"
        src="https://github.com/alopsantos.png"
      />
    </Flex>
  );
}

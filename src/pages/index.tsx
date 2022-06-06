import { Button, Flex, Stack } from "@chakra-ui/react";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { Input } from "../components/Form/Input";
import { AuthContext } from "../contexts/auth";

export default function SignIn() {
  const { register, handleSubmit, formState } = useForm();
  const { signIn } = useContext(AuthContext);

  async function handleSignIn(data) {
    await signIn(data);
  }

  return (
    <Flex w="100vw" h="100vh" align="center" justify="center">
      <Flex
        as="form"
        width="100%"
        maxWidth={360}
        bg="gray.800"
        p="8"
        borderRadius={8}
        flexDir="column"
        onSubmit={handleSubmit(handleSignIn)}
      >
        <Stack spacing="4">
          <Input
            name="email"
            type="email"
            label="E-mail"
            {...register("email")}
          />

          <Input
            name="password"
            type="password"
            label="Senha"
            {...register("password")}
          />

          <Button
            type="submit"
            mt="6"
            colorScheme="pink"
            size="lg"
            isLoading={formState.isSubmitting}
          >
            Entrar
          </Button>
        </Stack>
      </Flex>
    </Flex>
  );
}

import React from 'react';
import { Box, Button, Text, VStack, Heading } from '@chakra-ui/react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';

const Cancel = () => {
  const navigate = useNavigate();

  const location = useLocation();

  if (!location.state || !location.state.fromNavigation) {
    return <Navigate to="/" />;
  }
  const handleHome = () => {
    navigate('/');
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      bg="gray.50"
      px={4}
    >
      <VStack
        spacing={6}
        p={8}
        bg="white"
        rounded="lg"
        shadow="md"
        maxW="lg"
        width="full"
        textAlign="center"
      >
        <Heading as="h1" size="xl" color="red.600">
          Payment Cancelled
        </Heading>
        <Text fontSize="lg">
          It looks like your payment was not successful. Please try again or go back to the home page.
        </Text>
        <Button colorScheme="blue" onClick={handleHome}>
          Home Page
        </Button>

      </VStack>
    </Box>
  );
};

export default Cancel;

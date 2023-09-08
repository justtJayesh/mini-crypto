/* eslint-disable no-unused-vars */
import {
    Button,
    Card,
    CardBody,
    CardFooter,
    Divider,
    Heading,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Stack,
    Text,
    useDisclosure,
} from "@chakra-ui/react";
// import { Metric } from "@tremor/react";
import { useState } from "react";
import { Toaster, toast } from "react-hot-toast";

const initialState = [
    {
        id: 1,
        coin: "Bitcoin",
        price: "40000",
        qty: 0,
    },
    {
        id: 2,
        coin: "Ethereum",
        price: "2800",
        qty: 0,
    },
    {
        id: 3,
        coin: "Litecoin",
        price: "150",
        qty: 0,
    },
];

const CryptoStore = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [cryptoData, setCryptoData] = useState(initialState);
    const [userInputQty, setUserInputQty] = useState("");
    const [selectedCrypto, setSelectedCrypto] = useState("");
    const [cart, setCart] = useState([]);

    const handleQty = (id) => {
        setSelectedCrypto(id);
        onOpen();
    };

    const handleBuy = () => {
        if (isNaN(parseInt(userInputQty))) {
            toast.error("Please enter a valid amount.");
        } else {
            const updatedCryptoData = cryptoData.map((el) => {
                if (el.id === selectedCrypto) {
                    return {
                        ...el,
                        qty: el.qty + parseInt(userInputQty),
                    };
                }
                return el;
            });

            setCryptoData(updatedCryptoData);
            setSelectedCrypto("");
            setUserInputQty("");
            onClose();

            const newCartData = updatedCryptoData.find(
                (el) => el.id == selectedCrypto
            );
            // console.log(newCartData);
            setCart([...cart, newCartData]);
        }
    };

    return (
        <>
            <Toaster position="bottom-center" reverseOrder={false} />
            <div className="border border-gray-300 p-8 rounded-lg m-auto w-11/12">
                <Stack spacing={5}>
                    <div className="flex flex-row gap-4 justify-between">
                        {cryptoData?.map((el) => {
                            return (
                                <Card key={el.id} w={"30%"}>
                                    <CardBody>
                                        <Stack mt="6" spacing="3">
                                            <Heading size="md">
                                                {el.coin} 💰
                                            </Heading>
                                            <Text
                                                color="blue.600"
                                                fontSize="2xl"
                                            >
                                                ${el.price}
                                            </Text>
                                        </Stack>
                                    </CardBody>
                                    <Divider color="gray.400" />
                                    <CardFooter>
                                        <Button
                                            onClick={() => handleQty(el.id)}
                                            variant="outline"
                                            colorScheme="blue"
                                        >
                                            Add Quantity
                                        </Button>
                                    </CardFooter>
                                </Card>
                            );
                        })}
                    </div>
                    <Divider />
                    <div>
                        <Heading as={"h3"} size={"md"} mb={3}>
                            Your Cart
                        </Heading>

                        {cart.length == 0 ? (
                            <div className="border border-gray-300 rounded-lg p-3">
                                <h1 className="text-red-500">
                                    Your cart is empty! 😔
                                </h1>
                            </div>
                        ) : (
                            <div className="flex flex-col gap-3 border border-gray-300 rounded-lg p-3">
                                {cart.map((el, i) => {
                                    return (
                                        <div
                                            key={i}
                                            className="flex flex-col border border-gray-300 rounded-lg p-3"
                                        >
                                            <span className="font-bold">
                                                {el.coin}
                                            </span>{" "}
                                            Quantity: {el.qty} - Total Cost:{" "}
                                            {parseInt(
                                                el.price
                                                    .replace("$", "")
                                                    .replace(",", "")
                                            ) * el.qty}
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </Stack>

                <Modal isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Quantity</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <Input
                                value={userInputQty}
                                onChange={(e) =>
                                    setUserInputQty(e.target.value)
                                }
                                placeholder="Enter you quantity.."
                            />
                        </ModalBody>

                        <ModalFooter>
                            <Button
                                colorScheme="blue"
                                mr={3}
                                onClick={handleBuy}
                            >
                                Buy
                            </Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            </div>
        </>
    );
};

export default CryptoStore;

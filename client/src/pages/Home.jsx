import { React, useState, useEffect } from "react";
import {
  Group,
  Input,
  IconButton,
  Flex,
  Text,
  Spinner,
  VStack,
  Portal,
  Select,
  createListCollection,
  Button,
} from "@chakra-ui/react";
import { LuSearch } from "react-icons/lu";
import Modal from "../components/Modal";
import API from "../API";

function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [superType, setSuperType] = useState("");
  const [superData, setSuperData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [selectedSuper, setSelectedSuper] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    setSuperData([]);
    setHasSearched(false);
  }, [superType]);

  const superTypes = createListCollection({
    items: [
      { label: "Heroes", value: "heroes" },
      { label: "Villains", value: "villains" },
    ],
  });

  const handleSearch = async () => {
    if (!searchTerm || !superType) return;
    setIsLoading(true);
    setHasSearched(true);
    try {
      const parseData = searchTerm.replace(/\s+/g, "+");
      console.log("this is the tpye", superType);
      const data = await API.searchHeroes(superType, parseData);
      console.log("This is from home", data);
      setSuperData(data);
    } catch (error) {
      console.error("Search failed:", error);
      setSuperData(null);
    }
    setIsLoading(false);
  };

  const handleGetAll = async () => {
    if (!superType) return;
    setIsLoading(true);
    setHasSearched(true);
    try {
      console.log("this is the tpye", superType);
      const data = await API.fetchHeroes(superType);

      setSuperData(data);
    } catch (error) {
      console.error("Search failed:", error);
      setSuperData(null);
    }
    setIsLoading(false);
  };

  return (
    <>
      <Flex align="center" justify="center" direction="column" gap="5">
        <Group attached w="full" maxW="md">
          <Select.Root
            collection={superTypes}
            width="200px"
            value={superType}
            onValueChange={(e) => setSuperType(e.value)}
            style={styles.select}
          >
            <Select.HiddenSelect />

            <Select.Control>
              <Select.Trigger>
                <Select.ValueText placeholder="Type" />
              </Select.Trigger>
              <Select.IndicatorGroup>
                <Select.Indicator />
              </Select.IndicatorGroup>
            </Select.Control>
            <Portal>
              <Select.Positioner>
                <Select.Content>
                  {superTypes.items.map((supType) => (
                    <Select.Item item={supType} key={supType.value}>
                      {supType.label}
                      <Select.ItemIndicator />
                    </Select.Item>
                  ))}
                </Select.Content>
              </Select.Positioner>
            </Portal>
          </Select.Root>
          <Input
            placeholder="Search"
            value={searchTerm}
            style={styles.input}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSearch();
            }}
          />
          <IconButton
            aria-label="Search database"
            icon={<LuSearch />}
            onClick={handleSearch}
            colorPalette="cyan"
          >
            <LuSearch />
          </IconButton>
          <Button
            style={{ margin: "5px" }}
            colorPalette="cyan"
            onClick={handleGetAll}
          >
            Get all
          </Button>
        </Group>
        <div>
          {isLoading ? (
            <VStack style={{ marginTop: "16px" }}>
              <Spinner />
              <Text>Searching...</Text>
            </VStack>
          ) : (
            <div style={styles.results}>
              <Flex wrap={"wrap"} gap={5} justify={"space-evenly"}>
                {hasSearched ? (
                  superData && superData.length > 0 ? (
                    superData.map((sup, index) => (
                      <div
                        key={index}
                        style={styles.card}
                        onClick={() => {
                          setSelectedSuper(sup);
                          setIsDialogOpen(true);
                        }}
                      >
                        <Text>Name: {sup.name}</Text>
                        <Text>Powers: {sup.power.join(", ")}</Text>
                        <Text>
                          {superType[0] === "villains"
                            ? `evilplan: ${sup.evilPlan}`
                            : superType[0] === "heroes"
                            ? `City: ${sup.city}`
                            : "unknown type"}
                        </Text>
                        <Text>
                          {superType[0] === "heroes"
                            ? `Enemies: ${
                                Array.isArray(sup.enemies)
                                  ? sup.enemies
                                      .map((ene) => ene.name)
                                      .join(", ")
                                  : "None"
                              }`
                            : superType[0] === "villains"
                            ? `Archnemesis: ${
                                sup.archNemesisId?.name || "Unknown"
                              }`
                            : "Unknown type"}
                        </Text>
                      </div>
                    ))
                  ) : (
                    <Text>
                      No {superType[0]} found. Try a different search!
                    </Text>
                  )
                ) : (
                  <Text>
                    Search for a super hero or villain to get started!
                  </Text>
                )}
              </Flex>
            </div>
          )}
        </div>
      </Flex>
      <Modal
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        sup={selectedSuper}
        type={superType[0]}
      />
    </>
  );
}

export default Home;

const styles = {
  input: {
    backgroundColor: "#fff",
    color: "#000",
  },
  select: {
    backgroundColor: "#0891B2",
    color: "#fff",
    margin: "5px",
    borderRadius: "5px",
  },
  card: {
    backgroundColor: "#818589",
    color: "#000",
    border: "1px solid #ccc",
    borderRadius: "10px",
    padding: "15px",
    minWidth: "250px",
    maxWidth: "300px",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.3)",
  },
};

import { React, useState } from "react";
import {
  Select,
  createListCollection,
  Button,
  Portal,
  Field,
  Fieldset,
  Input,
  Flex,
} from "@chakra-ui/react";
import API from "../API";

function Create() {
  const [superType, setSuperType] = useState("");
  const [heroData, setheroData] = useState({
    hero: {
      name: "",
      age: "",
      power: [""],
      city: "",
    },
  });
  const [villainData, setvillainData] = useState({
    villain: {
      name: "",
      age: "",
      evilPlan: "",
      power: [""],
      archNemesisId: "",
    },
  });

  const handleChangeVillain = (e) => {
    const { name, value } = e.target;
    setvillainData((prev) => ({
      villain: {
        ...prev.villain,
        [name]: name === "power" ? value.split(",") : value,
      },
    }));
  };

  const handleChangeHero = (e) => {
    const { name, value } = e.target;
    setheroData((prev) => ({
      hero: {
        ...prev.hero,
        [name]: name === "power" ? value.split(",") : value,
      },
    }));
  };

  const handleCreate = async () => {
    try {
      if (superType[0] === "heroes") {
        await API.createHeroes("heroes", heroData);
        setheroData({
          hero: {
            name: "",
            age: "",
            power: [""],
            city: "",
          },
        });
      } else if (superType[0] === "villains") {
        await API.createHeroes("villains", villainData);
        setvillainData({
          villain: {
            name: "",
            age: "",
            evilPlan: "",
            power: [""],
            archNemesisId: "",
          },
        });
      }
    } catch (error) {
      console.error("Error creating:", error);
    }
  };

  const superTypes = createListCollection({
    items: [
      { label: "Heroes", value: "heroes" },
      { label: "Villains", value: "villains" },
    ],
  });
  return (
    <>
      <Flex direction="column" align={"center"}>
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
        <div>
          {" "}
          {superType[0] === "heroes" ? (
            <Fieldset.Root size="lg" maxW="md">
              <Fieldset.Content>
                <Field.Root>
                  <Field.Label>Name</Field.Label>
                  <Input
                    style={styles.input}
                    name="name"
                    value={heroData.hero.name}
                    onChange={handleChangeHero}
                  />
                </Field.Root>
                <Field.Root>
                  <Field.Label>Age</Field.Label>
                  <Input
                    style={styles.input}
                    name="age"
                    value={heroData.hero.age}
                    onChange={handleChangeHero}
                  />
                </Field.Root>

                <Field.Root>
                  <Field.Label>Powers</Field.Label>
                  <Input
                    style={styles.input}
                    name="power"
                    value={heroData.hero.power.join(",")}
                    onChange={handleChangeHero}
                  />
                </Field.Root>
                <Field.Root>
                  <Field.Label>City</Field.Label>
                  <Input
                    style={styles.input}
                    name="city"
                    value={heroData.hero.city}
                    onChange={handleChangeHero}
                  />
                </Field.Root>
              </Fieldset.Content>
              <Button onClick={handleCreate}>Create</Button>
            </Fieldset.Root>
          ) : superType[0] === "villains" ? (
            <Fieldset.Root size="lg" maxW="md">
              <Fieldset.Content>
                <Field.Root>
                  <Field.Label>Name</Field.Label>
                  <Input
                    style={styles.input}
                    name="name"
                    value={villainData.villain.name}
                    onChange={handleChangeVillain}
                  />
                </Field.Root>
                <Field.Root>
                  <Field.Label>Age</Field.Label>
                  <Input
                    style={styles.input}
                    name="age"
                    value={villainData.villain.age}
                    onChange={handleChangeVillain}
                  />
                </Field.Root>

                <Field.Root>
                  <Field.Label>Powers</Field.Label>
                  <Input
                    style={styles.input}
                    name="power"
                    value={villainData.villain.power.join(",")}
                    onChange={handleChangeVillain}
                  />
                </Field.Root>
                <Field.Root>
                  <Field.Label>Evil Plan</Field.Label>
                  <Input
                    style={styles.input}
                    name="evilPlan"
                    value={villainData.villain.evilPlan}
                    onChange={handleChangeVillain}
                  />
                </Field.Root>
                <Field.Root>
                  <Field.Label>archNemesis Id</Field.Label>
                  <Input
                    style={styles.input}
                    name="archNemesisId"
                    value={villainData.villain.archNemesisId}
                    onChange={handleChangeVillain}
                  />
                </Field.Root>
              </Fieldset.Content>
              <Button onClick={handleCreate}>Create</Button>
            </Fieldset.Root>
          ) : (
            "Please select a super type."
          )}
        </div>
      </Flex>
    </>
  );
}

export default Create;

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

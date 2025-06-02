import { React, useState, useEffect } from "react";
import {
  Select,
  createListCollection,
  Button,
  Dialog,
  Portal,
  Field,
  Fieldset,
  Input,
} from "@chakra-ui/react";
import API from "../API";

function Create() {
  const [superType, setSuperType] = useState("");

  const handleCreate = async (params) => {
    API.createHeroes(superType);
  };

  const superTypes = createListCollection({
    items: [
      { label: "Heroes", value: "heroes" },
      { label: "Villains", value: "villains" },
    ],
  });
  return (
    <>
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
        <Fieldset.Root size="lg" maxW="md">
          <Fieldset.Content>
            <Field.Root>
              <Field.Label>Name</Field.Label>
              <Input style={styles.input} name="name" />
            </Field.Root>
            <Field.Root>
              <Field.Label>Age</Field.Label>
              <Input style={styles.input} name="age" />
            </Field.Root>

            <Field.Root>
              <Field.Label>Powers</Field.Label>
              <Input style={styles.input} name="powers" />
            </Field.Root>
            <Field.Root>
              <Field.Label>City</Field.Label>
              <Input style={styles.input} name="city" />
            </Field.Root>
          </Fieldset.Content>
          <Button onClick={handleCreate}>Create</Button>
        </Fieldset.Root>
      </div>
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

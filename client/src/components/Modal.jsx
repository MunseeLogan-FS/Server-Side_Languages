import {
  Button,
  Dialog,
  Portal,
  Text,
  Field,
  Fieldset,
  Input,
} from "@chakra-ui/react";
import { toaster } from "../components/ui/toaster";
import API from "../API";
import React, { useState, useEffect } from "react";

function Modal({ isOpen, onClose, sup, type }) {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    powers: "",
    // city: "",
    // enemies: "",
    // evilPlan: "",
    // archnemesis: "",
  });

  useEffect(() => {
    if (sup) {
      setFormData({
        name: sup.name || "",
        age: sup.age || "",
        powers: sup.power?.join(", ") || "",
        // city: sup.city || "",
        // enemies: sup.enemies?.map((e) => e.name).join(", ") || "",
        // evilPlan: sup.evilPlan || "",
        // archnemesis: sup.archNemesisId?.name || "",
      });
    }
  }, [sup]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    const updates = {
      name: formData.name,
      age: formData.age,
      power: formData.powers.split(",").map((p) => p.trim()),
      //   city: formData.city,
      //   enemies: formData.enemies.split(",").map((e) => ({ name: e.trim() })),
      //   evilPlan: formData.evilPlan,
      //   archNemesisId: { name: formData.archnemesis },
    };

    console.log("updaheheashh", updates);

    try {
      await API.updateHeroes(type, sup._id, updates);
      toaster.create({
        description: "Update Success",
        type: "info",
        duration: 2000,
      });
      onClose();
    } catch (err) {
      console.error(err);
      toaster.create({
        description: "Update failed",
        type: "info",
        duration: 2000,
      });
    }
  };

  const handleDelete = async () => {
    API.deleteHeroes(type, sup._id);
  };

  if (!sup) return null;
  if (type === "heroes") {
    return (
      <div>
        <Dialog.Root
          open={isOpen}
          onOpenChange={onClose}
          size="xl"
          motionPreset="slide-in-bottom"
        >
          <Portal>
            <Dialog.Backdrop />
            <Dialog.Positioner>
              <Dialog.Content bg="cyan.900" color="white">
                <Dialog.Header>
                  <Dialog.Title>{sup.name}</Dialog.Title>
                </Dialog.Header>
                <Dialog.Body>
                  <Fieldset.Root size="lg" maxW="md">
                    <Fieldset.Content>
                      <Field.Root>
                        <Field.Label>Name</Field.Label>
                        <Input
                          style={styles.input}
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                        />
                      </Field.Root>
                      <Field.Root>
                        <Field.Label>Age</Field.Label>
                        <Input
                          style={styles.input}
                          name="age"
                          value={formData.age}
                          onChange={handleChange}
                        />
                      </Field.Root>

                      <Field.Root>
                        <Field.Label>Powers</Field.Label>
                        <Input
                          style={styles.input}
                          name="powers"
                          value={formData.powers}
                          onChange={handleChange}
                        />
                      </Field.Root>
                      <Field.Root>
                        <Field.Label>City</Field.Label>
                        <Input
                          style={styles.input}
                          name="city"
                          value={formData.city}
                          onChange={handleChange}
                        />
                      </Field.Root>
                      <Field.Root>
                        <Field.Label>Enemy</Field.Label>
                        <Input
                          style={styles.input}
                          name="enemies"
                          value={formData.enemies}
                          onChange={handleChange}
                        />
                      </Field.Root>
                    </Fieldset.Content>
                  </Fieldset.Root>
                </Dialog.Body>
                <Dialog.Footer>
                  <Button variant="outline" onClick={onClose}>
                    Close
                  </Button>
                  <Button onClick={handleUpdate}>Update</Button>
                  <Button onClick={handleDelete}>Delete</Button>
                </Dialog.Footer>
              </Dialog.Content>
            </Dialog.Positioner>
          </Portal>
        </Dialog.Root>
      </div>
    );
  } else if (type === "villains") {
    return (
      <div>
        <Dialog.Root
          open={isOpen}
          onOpenChange={onClose}
          size="xl"
          motionPreset="slide-in-bottom"
        >
          <Portal>
            <Dialog.Backdrop />
            <Dialog.Positioner>
              <Dialog.Content bg="cyan.900" color="white">
                <Dialog.Header>
                  <Dialog.Title>{sup.name}</Dialog.Title>
                </Dialog.Header>
                <Dialog.Body>
                  {" "}
                  <Fieldset.Root size="lg" maxW="md">
                    <Fieldset.Content onSubmit={handleUpdate}>
                      <Field.Root>
                        <Field.Label>Name</Field.Label>
                        <Input
                          style={styles.input}
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                        />
                      </Field.Root>
                      <Field.Root>
                        <Field.Label>Age</Field.Label>
                        <Input
                          style={styles.input}
                          name="age"
                          value={formData.age}
                          onChange={handleChange}
                        />
                      </Field.Root>

                      <Field.Root>
                        <Field.Label>Powers</Field.Label>
                        <Input
                          style={styles.input}
                          name="powers"
                          value={formData.powers}
                          onChange={handleChange}
                        />
                      </Field.Root>
                      <Field.Root>
                        <Field.Label>Evil Plan</Field.Label>
                        <Input
                          style={styles.input}
                          name="evilPlan"
                          value={formData.evilPlan}
                          onChange={handleChange}
                        />
                      </Field.Root>
                      <Field.Root>
                        <Field.Label>Archnemesis</Field.Label>
                        <Input
                          style={styles.input}
                          name="archnemesis"
                          value={formData.archnemesis}
                          onChange={handleChange}
                        />
                      </Field.Root>
                    </Fieldset.Content>
                  </Fieldset.Root>
                </Dialog.Body>
                <Dialog.Footer>
                  <Button variant="outline" onClick={onClose}>
                    Close
                  </Button>
                  <Button onClick={handleUpdate}>Update</Button>
                  <Button onClick={handleDelete}>Delete</Button>
                </Dialog.Footer>
              </Dialog.Content>
            </Dialog.Positioner>
          </Portal>
        </Dialog.Root>
      </div>
    );
  } else {
    return <Text>Bad Type</Text>;
  }
}
export default Modal;

const styles = {
  input: {
    backgroundColor: "#fff",
    color: "#000",
  },
};

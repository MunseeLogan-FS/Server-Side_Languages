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
  const [heroData, setheroData] = useState({
    name: "",
    age: "",
    powers: "",
    city: "",
    enemies: "",
  });
  const [villainData, setvillainData] = useState({
    name: "",
    age: "",
    powers: "",
    evilPlan: "",
    archnemesis: "",
  });

  useEffect(() => {
    if (sup) {
      if (type === "heroes") {
        setheroData({
          name: sup.name || "",
          age: sup.age || "",
          powers: sup.power?.join(", ") || "",
          city: sup.city || "",
          enemies: sup.enemies?.map((e) => e._id).join(", ") || "",
        });
      } else if (type === "villains") {
        setvillainData({
          name: sup.name || "",
          age: sup.age || "",
          powers: sup.power?.join(", ") || "",
          evilPlan: sup.evilPlan || "",
          archnemesis: sup.archNemesisId?._id || "",
        });
      }
    }
  }, [sup]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (type === "heroes") {
      setheroData((prev) => ({ ...prev, [name]: value }));
    } else if (type === "villains") {
      setvillainData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    let updates = {};
    if (type === "heroes") {
      updates = {
        name: heroData.name,
        age: heroData.age,
        power: heroData.powers.split(",").map((p) => p.trim()),
        city: heroData.city,
        enemies: heroData.enemies.split(",").map((e) => e.trim()),
      };
    } else if (type === "villains") {
      updates = {
        name: villainData.name,
        age: villainData.age,
        power: villainData.powers.split(",").map((p) => p.trim()),
        evilPlan: villainData.evilPlan,
        archNemesisId: villainData.archnemesis,
      };
    }

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
    try {
      API.deleteHeroes(type, sup._id);
      toaster.create({
        description: "Delete Success",
        type: "info",
        duration: 2000,
      });
      onClose();
    } catch (err) {
      console.error(err);
      toaster.create({
        description: "Delete Failed",
        type: "info",
        duration: 2000,
      });
    }
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
                          value={heroData.name}
                          onChange={handleChange}
                        />
                      </Field.Root>
                      <Field.Root>
                        <Field.Label>Age</Field.Label>
                        <Input
                          style={styles.input}
                          name="age"
                          value={heroData.age}
                          onChange={handleChange}
                        />
                      </Field.Root>

                      <Field.Root>
                        <Field.Label>Powers</Field.Label>
                        <Input
                          style={styles.input}
                          name="powers"
                          value={heroData.powers}
                          onChange={handleChange}
                        />
                      </Field.Root>
                      <Field.Root>
                        <Field.Label>City</Field.Label>
                        <Input
                          style={styles.input}
                          name="city"
                          value={heroData.city}
                          onChange={handleChange}
                        />
                      </Field.Root>
                      <Field.Root>
                        <Field.Label>Enemy</Field.Label>
                        <Input
                          style={styles.input}
                          name="enemies"
                          value={heroData.enemies}
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
                          value={villainData.name}
                          onChange={handleChange}
                        />
                      </Field.Root>
                      <Field.Root>
                        <Field.Label>Age</Field.Label>
                        <Input
                          style={styles.input}
                          name="age"
                          value={villainData.age}
                          onChange={handleChange}
                        />
                      </Field.Root>

                      <Field.Root>
                        <Field.Label>Powers</Field.Label>
                        <Input
                          style={styles.input}
                          name="powers"
                          value={villainData.powers}
                          onChange={handleChange}
                        />
                      </Field.Root>
                      <Field.Root>
                        <Field.Label>Evil Plan</Field.Label>
                        <Input
                          style={styles.input}
                          name="evilPlan"
                          value={villainData.evilPlan}
                          onChange={handleChange}
                        />
                      </Field.Root>
                      <Field.Root>
                        <Field.Label>Archnemesis</Field.Label>
                        <Input
                          style={styles.input}
                          name="archnemesis"
                          value={villainData.archnemesis}
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

import AsyncStorage from "@react-native-async-storage/async-storage";
import { format } from "date-fns";

export interface PlantProps {
  id: string;
  name: string;
  about: string;
  water_tips: string;
  photo: string;
  environments: [string];
  frequency: {
    times: number;
    repeat_every: string;
  };
  hour: string;
  datetimeNotification: Date;
}

export interface StoragePlantProps {
  [id: string]: {
    data: PlantProps;
  };
}

export async function savePlant(plant: PlantProps): Promise<void> {
  try {
    const nextTime = new Date(plant.datetimeNotification);
    const now = new Date();

    const { times, repeat_every } = plant.frequency;
    if (repeat_every === "week") {
      const interval = Math.trunc(7 / times);
      nextTime.setDate(now.getDate() + interval);
    } else nextTime.setDate(nextTime.getDate() + 1);

    const seconds = Math.abs(
      Math.ceil(now.getDate() - nextTime.getDate() / 1000)
    );

    const data = await AsyncStorage.getItem("@plantmanager:plants");
    const oldPlants = data ? (JSON.parse(data) as StoragePlantProps) : {};

    const newPlant = {
      [plant.id]: {
        data: plant,
      },
    };

    await AsyncStorage.setItem(
      "@plantmanager:plants",
      JSON.stringify({
        ...newPlant,
        ...oldPlants,
      })
    );
  } catch (error) {
    throw new Error(error);
  }
}

export async function loadPlant(): Promise<PlantProps[]> {
  try {
    const data = await AsyncStorage.getItem("@plantmanager:plants");
    const plants = data ? (JSON.parse(data) as StoragePlantProps) : {};

    const plantsSorted = Object.keys(plants)
      .map((plant) => {
        return {
          ...plants[plant].data,
          hour: format(
            new Date(plants[plant].data.datetimeNotification),
            "HH:mm"
          ),
        };
      })
      .sort((a, b) =>
        Math.floor(
          new Date(a.datetimeNotification).getTime() / 1000 -
            Math.floor(new Date(b.datetimeNotification).getTime() / 1000)
        )
      );
    return plantsSorted;
  } catch (error) {
    throw new Error(error);
  }
}

export async function removePlant(id: string): Promise<void> {
  const data = await AsyncStorage.getItem("@plantmanager:plants");
  const plants = data ? (JSON.parse(data) as StoragePlantProps) : {};

  delete plants[id];

  await AsyncStorage.setItem("@plantmanager:plants", JSON.stringify(plants));
}
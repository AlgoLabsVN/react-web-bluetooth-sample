import * as React from "react";

export interface Weight {
  connect: () => void;
  disconnect: () => void;
  isConnected: boolean;
  weight: string;
}

export const useWeightIND236 = (): Weight => {
  const [isConnected, setIsConnected] = React.useState(false);
  const [weight, setWeight] = React.useState("0");

  const handleCharacteristicValueChanged = (event: any) => {
    const decoder = new TextDecoder();
    const str = decoder.decode(event.target.value);
    setWeight(str);
  };

  const [trueDevice, setDevice] = React.useState<BluetoothDevice>();

  const connect = async () => {
    try {
      const device = await navigator.bluetooth.requestDevice({
        filters: [
          {
            namePrefix: "IND",
          },
        ],
        optionalServices: ["4fafc201-1fb5-459e-8fcc-c5c9c331914b"],
      });

      if (!device) {
        console.error("Failed to connect to device.");
        return;
      }

      setDevice(device);

      const server = await device.gatt?.connect();

      if (!server) {
        console.error("Failed to connect to server");
        return;
      }
      setIsConnected(true);
      const time1 = Date.now();
      const service = await server.getPrimaryService(
        "4fafc201-1fb5-459e-8fcc-c5c9c331914b"
      );

      if (!service) {
        console.error("Failed to connect to service.");
        return;
      }

      const characteristic = await service.getCharacteristic(
        "beb5483e-36e1-4688-b7f5-ea07361b26a8"
      );
      if (!characteristic) {
        console.error("Failed to get weight characteristic.");
        return;
      }
      const time2 = Date.now();
      console.log(
        "Milisecond need to connect to characteristic:" + (time2 - time1)
      );
      await characteristic.writeValue(new TextEncoder().encode("0"));
      const time3 = Date.now();
      console.log(
        "Milisecond need to write to characteristic:" + (time3 - time1)
      );

      await characteristic.startNotifications();

      characteristic.addEventListener(
        "characteristicvaluechanged",
        handleCharacteristicValueChanged
      );
    } catch (error) {
      console.log(error);
      setIsConnected(false);
    }
  };

  const disconnect = () => {
    trueDevice?.gatt?.disconnect();
    setIsConnected(false);
  };
  return {
    connect,
    isConnected,
    weight,
    disconnect,
  };
};

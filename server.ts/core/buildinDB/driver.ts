import lowdb from "lowdb";
import CryptoAdapter from "lowdb-crypto-adapter";

export default function BuilInDbDriver(file: string, sekretKey: string) {
  const adapter = new CryptoAdapter(file, sekretKey);
  const driver = lowdb(adapter);

  driver["queryInterface"] = {};

  return driver;
}
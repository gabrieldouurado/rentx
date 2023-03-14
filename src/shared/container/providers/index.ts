import { container } from "tsyringe";

import { IDateProvider } from "./DateProvider/IDateProvider";
import { DateFNSProvider } from "./DateProvider/implementations/DateFNSProvider";
import { IMailProvider } from "./MailProvider/IMailProvider";
import { EtherealMailProvider } from "./MailProvider/implementations/EtherealMailProvider";
import { LocalStorageProvider } from "./StorageProvider/implementations/LocalStorageProvider";
import { IStorageProvider } from "./StorageProvider/IStorageProvider";

container.registerSingleton<IDateProvider>("DateFNSProvider", DateFNSProvider);

container.registerInstance<IMailProvider>(
  "EtherealMailProvider",
  new EtherealMailProvider()
);

container.registerSingleton<IStorageProvider>(
  "LocalStorageProvider",
  LocalStorageProvider
);

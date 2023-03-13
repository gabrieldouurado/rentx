import { container } from "tsyringe";

import { IDateProvider } from "./DateProvider/IDateProvider";
import { DateFNSProvider } from "./DateProvider/implementations/DateFNSProvider";
import { IMailProvider } from "./MailProvider/IMailProvider";
import { EtherealMailProvider } from "./MailProvider/implementations/EtherealMailProvider";

container.registerSingleton<IDateProvider>("DateFNSProvider", DateFNSProvider);

container.registerInstance<IMailProvider>(
  "EtherealMailProvider",
  new EtherealMailProvider()
);

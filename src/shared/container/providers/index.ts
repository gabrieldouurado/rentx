import { container } from "tsyringe";

import { IDateProvider } from "./DateProvider/IDateProvider";
import { DateFNSProvider } from "./DateProvider/implementations/DateFNSProvider";

container.registerSingleton<IDateProvider>("DateFNSProvider", DateFNSProvider);

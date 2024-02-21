import Cookies from "js-cookie";
import { useToken } from "./token";
import { useLeads } from "./leads";
import { createTable } from "./table";
import { createPagination } from "./pagination";
import { useLimit } from "./limit";
import { useSort } from "./sort";
import { state } from "./state";

const table = createTable();
const pagination = createPagination();

const { getAccessTokens, revalidateAccessToken } = useToken();
const { getAll, sortLeads } = useLeads();

export const createApp = async () => {
  if (!Cookies.get("accessToken")) {
    try {
      await getAccessTokens();
    } catch {
      console.warn("Please get new authorization code since it has been used");
    }
  } else {
    await revalidateAccessToken();
  }

  const leads = await getAll();

  table.mount(
    document.querySelector("#app"),
    sortLeads(leads.data, state.sort.value, state.sort.type)
  );

  const controlWrapper = document.createElement("div");
  controlWrapper.classList = ["flex justify-between mt-4 control-wrapper"];

  const controls = document.createElement("div");
  controls.classList = ["flex gap-3 controls"];

  controlWrapper.appendChild(controls);

  document.querySelector("#app").appendChild(controlWrapper);

  const limitDropdown = useLimit();
  const sortDropdown = useSort();

  sortDropdown.mount(document.querySelector(".controls"));

  limitDropdown.mount(document.querySelector(".controls"));

  pagination.mount(
    document.querySelector(".control-wrapper"),
    leads._links,
    leads._page,
    0
  );
};

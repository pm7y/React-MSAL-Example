import { EndSessionRequest, InteractionStatus } from "@azure/msal-browser";
import { useAccount, useMsal } from "@azure/msal-react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";

import { UserCircleIcon } from "@heroicons/react/24/outline";
import { HomeIcon } from "@heroicons/react/24/solid";
import { Link } from "@tanstack/react-router";
import { createRef, useEffect } from "react";
import { useGraphUserPhoto } from "../api/useGraphUserPhoto";
import { loginRequest } from "../infrastructure/auth/authConfig";
import { Button } from "./Button";

export const UserMenu = () => {
  const account = useAccount();
  const userName = account?.idTokenClaims?.name;
  const photoBlobUrl = useGraphUserPhoto();
  const avatarDiv = createRef<HTMLDivElement>();

  useEffect(() => {
    if (avatarDiv.current) {
      avatarDiv.current.style.background = `url(${photoBlobUrl}) no-repeat center center / cover`;
    }
  }, [avatarDiv, photoBlobUrl]);

  return (
    <Menu>
      <MenuButton className="inline-flex items-center justify-center gap-1 text-base font-medium leading-none cursor-pointer">
        {photoBlobUrl ? (
          <>
            <div
              className="w-8 mr-2 border border-orange-300 rounded-full aspect-square"
              ref={avatarDiv}
            />
            <span className="hidden sm:inline">{userName}</span>
          </>
        ) : (
          <>
            <UserCircleIcon className="mr-2 size-8" />
            <span className="hidden sm:inline">{userName}</span>
          </>
        )}
      </MenuButton>
      <MenuItems
        anchor="bottom end"
        className="px-4 py-2 text-sm text-black origin-top-right border rounded-md drop-shadow-md text-md border-neutral-100 bg-neutral-100">
        <MenuItem>
          <Link to="/" className="flex items-center gap-3 py-2 no-underline ">
            <HomeIcon className="size-6" /> Welcome
          </Link>
        </MenuItem>
      </MenuItems>
    </Menu>
  );
};

export function LogoutButton() {
  const { instance, inProgress } = useMsal();
  const accounts = instance.getAllAccounts();
  const account = accounts ? accounts[0] : null;

  return (
    <Button
      disabled={inProgress !== InteractionStatus.None}
      onClick={async () => {
        try {
          await instance.logoutRedirect({
            ...loginRequest,
            account: account,
          } as EndSessionRequest);
        } catch (redirectError) {
          // TODO handle this error
          console.error("logout error", redirectError);
          throw redirectError;
        }
      }}>
      Log out
    </Button>
  );
}

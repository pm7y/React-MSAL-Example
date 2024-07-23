import { EndSessionRequest, InteractionStatus } from '@azure/msal-browser';
import { useAccount, useMsal } from '@azure/msal-react';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';

import { UserCircleIcon } from '@heroicons/react/24/outline';
import { createRef, useEffect } from 'react';
import { useGraphUserPhoto } from '../api/useGraphUserPhoto';
import { loginRequest } from '../infrastructure/auth/authConfig';
import { Button } from './Button';

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
      <MenuButton className="inline-flex cursor-pointer items-center justify-center gap-1 text-base font-medium leading-none">
        {photoBlobUrl ? (
          <>
            <div
              className="mr-2 aspect-square w-8 rounded-full border border-orange-300"
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
        className="mt-2 origin-top-right rounded-md border border-neutral-100 bg-neutral-100 text-sm drop-shadow-md"
      >
        <MenuItem>
          <LogoutButton />
        </MenuItem>
      </MenuItems>
    </Menu>
  );
};

export function LogoutButton() {
  const { instance, inProgress } = useMsal();
  const accounts = instance.getAllAccounts();
  const account = accounts ? accounts[0] : null;
  const currentMsalOperationInProgress = inProgress;

  return (
    <Button
      disabled={currentMsalOperationInProgress !== InteractionStatus.None}
      onClick={async () => {
        try {
          await instance.logoutRedirect({
            ...loginRequest,
            account: account,
            logoutHint: account?.username,
          } as EndSessionRequest);
        } catch (redirectError) {
          // TODO handle this error
          console.error('logout error', redirectError);
          throw redirectError;
        }
      }}
    >
      Log out
    </Button>
  );
}

import { MenuGroup, MenuItem } from "@chakra-ui/react";
import { signOut, useSession } from "next-auth/react";
import React from "react";

export const MenuProfileItem = () => {
  const { data: session } = useSession();
  const username = session?.user?.name;
  const isUsernameLong = username ? username?.length > 15 : null;
  const shortUsername = isUsernameLong
    ? username?.slice(0, 15) + "..."
    : username;

  return (
    <MenuGroup title={"Signed in as: " + shortUsername}>
      <MenuItem
        onClick={() => signOut({ callbackUrl: "/signin", redirect: false })}
      >
        Sign out
      </MenuItem>
    </MenuGroup>
  );
};

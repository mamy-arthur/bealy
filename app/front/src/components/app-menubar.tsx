import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarSeparator, MenubarShortcut, MenubarTrigger } from "./ui/menubar";

export default function AppMenubar() {
    return (
        <Menubar>
            <MenubarMenu>
                <MenubarTrigger>File</MenubarTrigger>
                <MenubarContent>
                <MenubarItem>
                    New Tab <MenubarShortcut>⌘T</MenubarShortcut>
                </MenubarItem>
                <MenubarItem>New Window</MenubarItem>
                <MenubarSeparator />
                <MenubarItem>Share</MenubarItem>
                <MenubarSeparator />
                <MenubarItem>Print</MenubarItem>
                </MenubarContent>
            </MenubarMenu>
        </Menubar>
    );
}
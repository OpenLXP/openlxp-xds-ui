import { Menu } from "@headlessui/react";

const UserMenu = ({ menuItems, username }) => {
  return (
    <div className=" text-right  top-16 z-50">
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-white rounded-md bg-base-blue hover:bg-dark-blue focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
            <div className="flex flex-row items-center space-x-2">
              <div>{username}</div>

              <ion-icon name="chevron-down-outline" className="" />
            </div>
          </Menu.Button>
        </div>
        <Menu.Items className="absolute right-0 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="flex flex-col text-left px-1 py-1">
            {menuItems?.map((item, index) => {
              return (
                <Menu.Item key={index}>
                  <div
                    onClick={item.func}
                    className="hover:bg-base-blue hover:text-white bg-white text-gray-900 w-full pl-2 py-2 rounded-md cursor-pointer"
                  >
                    {item?.title}
                  </div>
                </Menu.Item>
              );
            })}
          </div>
        </Menu.Items>
      </Menu>
    </div>
  );
};
export default UserMenu;

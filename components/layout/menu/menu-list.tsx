import MenuListItem from './menu-list-item'

function MenuList() {
  return (
    <ul>
      <MenuListItem href='/details/65' label='Red' />
      <MenuListItem href='/details/58' label='Orange' />
      <MenuListItem href='/details/92' label='Yellow' />
      <MenuListItem href='/details/35' label='Green' />
      <MenuListItem href='/details/8' label='Blue' />
      <MenuListItem href='/details/63' label='Purple' />
      <MenuListItem href='/details/10' label='Brown' />
      <MenuListItem href='/details/34' label='Gray' />
    </ul>
  );
}

export default MenuList;
import { ChangeEvent, useEffect, useMemo, useState } from 'react';
import { UserItem } from './components/UserItem/UserItem';
import { IUser } from './interfaces';
import { useTypedDispatch, useTypedSelector } from './redux/store';
import { fetchUsersThunk, restoreFilteredUsers } from './redux/user/userReducers';

import './styles.scss';

function App() {
  const dispatch = useTypedDispatch();
  const {allUsers, filteredUsers} = useTypedSelector((store) => store.users);
  const [search, setSearch] = useState<string>('')
  const [users, setUsers] = useState<IUser[]>([]);

  useEffect(() => {
    dispatch(fetchUsersThunk());
  }, []);

  useEffect(() => {
    setUsers(filteredUsers);
  }, [filteredUsers])

  const finalUsers = useMemo(() => {
    if (search.length > 0) {
      const allFilteredUsers = filteredUsers?.filter((user) => {
        return user.name.includes(search) || user.username.includes(search) || user.email.includes(search);
      })
      return allFilteredUsers;
    } else {
      return users
    }
  }, [search, filteredUsers, users])

  const onResetFilter = () => {
    setSearch('');
    setUsers(allUsers);
    dispatch(restoreFilteredUsers())
  }

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  }

  return (
    <>
      <div className="filter">
        <label>
          <span>Filter:</span>
          <input className='filter__input' type="text" value={search} onChange={handleSearch} />
          <button className="filter__resetBtn" onClick={onResetFilter}>Reset filter</button>
        </label>
      </div>
      <ol>
        {finalUsers.map((user) => {
          return <UserItem searchedValue={search} key={user.name} user={user} />
        })}
      </ol>
    </>
  );
}

export default App;

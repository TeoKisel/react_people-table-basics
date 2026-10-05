import { useEffect, useState } from 'react';
import { Loader } from '../components/Loader';
import { People } from '../components/People/PeopleTable';
import { Person } from '../types';
import { getPeople } from '../api';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [peopleIsLoading, setPeopleIsLoading] = useState<boolean>(false);
  const [errorLoading, setErrorLoading] = useState<string>('');

  const findMotherByName = (motherName: string) => {
    people.find(person => person.name === motherName);
  };

  const filtredPeople = people.map(person => ({
    ...person,
    mother: findMotherByName(person.motherName),
  }));

  useEffect(() => {
    setPeopleIsLoading(true);
    getPeople()
      .then(peopleList => {
        setPeople(peopleList);
      })
      .catch(() => setErrorLoading(''))
      .finally(() => setPeopleIsLoading(false));
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">
          {peopleIsLoading ? (
            <Loader />
          ) : (
            <table
              data-cy="peopleTable"
              className="table is-striped is-hoverable is-narrow is-fullwidth"
            >
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Sex</th>
                  <th>Born</th>
                  <th>Died</th>
                  <th>Mother</th>
                  <th>Father</th>
                </tr>
              </thead>

              <People people={people} />
            </table>
          )}

          <p data-cy="peopleLoadingError" className="has-text-danger">
            {errorLoading}
          </p>

          <p data-cy="noPeopleMessage">There are no people on the server</p>
        </div>
      </div>
    </>
  );
};

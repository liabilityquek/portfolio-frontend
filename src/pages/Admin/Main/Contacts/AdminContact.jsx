import React from "react";
import { useQueries, useQuery } from "react-query";
import axios from "axios";
import { baseUrl } from "../../../../utilities/users-api";
import Loading from "../../../../components/Loading";
import Error from "../../../../components/Error";
import ContactTable from "./ContactTable";
import DeleteContent from './../../../../components/Admin/DeleteContent';
import EditContent from './../../../../components/Admin/EditContent';

export default function AdminContact({ user }) {
  const { isLoading, error, data, isFetching } = useQuery("socials", () =>
    axios.get(`${baseUrl}socials/`).then((response) => {
      console.log(JSON.stringify(response.data), null, 2);
      return response.data;
    })
  );
  if (isLoading) return <Loading />;

  if (error) return <Error />;

  const tableData = data.map((d) => ({
    action: (
      <>
        <EditContent user={user} data={d} contentType={'editContact'}/>

        <DeleteContent user={user} id={d?.id} data={d} contentType={'deleteContact'}/>
      </>
    ),
    name: d.name,
    link: d.link,
  }));

  return (
    <>
      <ContactTable data={tableData} />
    </>
  );
}

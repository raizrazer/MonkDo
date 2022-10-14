import React from 'react'
import Layout from '../components/Layout'
import Image from 'next/image';
import ArchivedItem from '../components/ArchivedItem';
export default function archives() {
  const iconSize = 25;
  return (
    <Layout>
        <div className="archive-todos">
            <div className="header-text justpadding">
              <p>Archives</p>
            </div>
            <div className="archivetodoList">

              <ArchivedItem/>
              <ArchivedItem/>
              <ArchivedItem/>
              <ArchivedItem/>
              <ArchivedItem/>
            </div>
          </div>
    </Layout>
  )
}

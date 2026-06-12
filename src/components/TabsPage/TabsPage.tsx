import React from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { TabType } from '../../types/Tab';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import classNames from 'classnames';

interface Props {
  tabs: TabType[];
}

export const TabsPage: React.FC<Props> = ({ tabs }) => {
  const { tabId } = useParams();
  const navigate = useNavigate();

  const activeTabIndex = tabs.findIndex(tab => tab.id === tabId);
  const selectedIndex = activeTabIndex !== -1 ? activeTabIndex : 0;

  // Проверяем: если tabId передан в URL, то он ОБЯЗАТЕЛЬНО должен быть найден в массиве tabs
  const isTabValid = tabId ? activeTabIndex !== -1 : false;

  const handleSelect = (index: number) => {
    const clickedTab = tabs[index];
    if (clickedTab) {
      navigate(`/tabs/${clickedTab.id}`, { replace: true });
    }
  };

  return (
    <div className="container">
      <h1 className="title">Tabs page</h1>

      <Tabs selectedIndex={selectedIndex} onSelect={handleSelect}>
        <div className="tabs is-boxed">
          <TabList className="">
            {tabs.map(tab => (
              <Tab
                key={tab.id}
                data-cy="Tab"
                className={classNames({ 'is-active': tabId === tab.id })}
              >
                <Link to={`/tabs/${tab.id}`} replace>
                  {tab.title}
                </Link>
              </Tab>
            ))}
          </TabList>
        </div>

        {tabs.map(tab => (
          <TabPanel
            className="block"
            data-cy="TabContent"
            key={tab.id}
          >
            {isTabValid ? tab.content : 'Please select a tab'}
          </TabPanel>
        ))}
      </Tabs>
    </div>
  );
};

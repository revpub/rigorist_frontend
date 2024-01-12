import React, { useState } from "react";
import { Button, Space } from "antd";
import TimeEntryModal from "../components/TimeEntryModal"
import DefineActivityModal from "../components/DefineActivityModal"
import MyTimeEntriesLinePlot from "../components/plots/MyTimeEntriesLinePlot";

const Home = () => {

  const [isTimeEntryModalOpen, setTimeEntryModalOpen] = useState(false);
  const [isDefineActivityModalOpen, setDefineActivityModalOpen] = useState(false);

  /* TimeEntryModal functions */
  const showTimeEntryModal = () => {
    setTimeEntryModalOpen(true);
  };

  /* DefineActivityModal functions */
  const showDefineActivityModal = () => {
    setDefineActivityModalOpen(true);
  };

  return (
    <React.Fragment>
      <Space>
      <Button type="primary" onClick={showTimeEntryModal}>
        Make New Time Entry
      </Button>
      <Button onClick={showDefineActivityModal}>
        Define New Activity
      </Button>
      </Space>
      <MyTimeEntriesLinePlot />
      <TimeEntryModal
        open={isTimeEntryModalOpen}
        setModalVisible={setTimeEntryModalOpen}
        title={"Make New Time Entry"}
      ></TimeEntryModal>
      <DefineActivityModal
        open={isDefineActivityModalOpen}
        setModalVisible={setDefineActivityModalOpen}
        title={"Define New Activity"}
      ></DefineActivityModal>
    </React.Fragment>
  );
};
export default Home;

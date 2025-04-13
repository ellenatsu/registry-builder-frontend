import { Layout, Menu, Table } from "antd";
import { BarChartOutlined, HomeOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const { Header, Sider, Content } = Layout;

// Define table columns matching your provided mock data
const columns = [
  { title: "#", dataIndex: "key", key: "key" },
  { title: "Week", dataIndex: "week", key: "week" },
  { title: "Money In", dataIndex: "moneyIn", key: "moneyIn" },
  { title: "Money Out", dataIndex: "moneyOut", key: "moneyOut" },
  {
    title: "% PlatformFee Revenue(2.9%)",
    dataIndex: "percentFee",
    key: "percentFee",
  },
  {
    title: "Fixed PlatformFee Revenue(0.3)",
    dataIndex: "fixedFee",
    key: "fixedFee",
  },
  { title: "New Wishlist", dataIndex: "newWishlist", key: "newWishlist" },
  {
    title: "Closed Wishlist",
    dataIndex: "closedWishlist",
    key: "closedWishlist",
  },
];

// Use the provided mock data
const tableData = [
  {
    key: "1",
    week: "Jan 13 - 19",
    moneyIn: 1802.45,
    moneyOut: 0,
    percentFee: 52.27,
    fixedFee: 5.41,
    newWishlist: 4,
    ongoingWishlist: 0,
    closedWishlist: 0,
  },
  {
    key: "2",
    week: "Jan 20 - 26",
    moneyIn: 3498.75,
    moneyOut: 1695.8,
    percentFee: 101.46,
    fixedFee: 10.5,
    newWishlist: 5,
    ongoingWishlist: 3,
    closedWishlist: 1,
  },
  {
    key: "3",
    week: "Jan 27 - Feb 2",
    moneyIn: 12045.6,
    moneyOut: 3398.2,
    percentFee: 349.32,
    fixedFee: 28.14,
    newWishlist: 10,
    ongoingWishlist: 6,
    closedWishlist: 3,
  },
  {
    key: "4",
    week: "Feb 3 - 9",
    moneyIn: 18239.56,
    moneyOut: 11485.3,
    percentFee: 528.95,
    fixedFee: 44.72,
    newWishlist: 15,
    ongoingWishlist: 18,
    closedWishlist: 5,
  },
  {
    key: "5",
    week: "Feb 10 - 16",
    moneyIn: 21087.9,
    moneyOut: 17492.45,
    percentFee: 611.55,
    fixedFee: 63.26,
    newWishlist: 12,
    ongoingWishlist: 28,
    closedWishlist: 8,
  },
  {
    key: "6",
    week: "Feb 17 - 23",
    moneyIn: 25983.25,
    moneyOut: 20487.6,
    percentFee: 753.51,
    fixedFee: 77.95,
    newWishlist: 18,
    ongoingWishlist: 35,
    closedWishlist: 12,
  },
  {
    key: "7",
    week: "Feb 24 - Mar 2",
    moneyIn: 23945.8,
    moneyOut: 24983.4,
    percentFee: 694.43,
    fixedFee: 61.84,
    newWishlist: 14,
    ongoingWishlist: 45,
    closedWishlist: 15,
  },
  {
    key: "8",
    week: "Mar 3 - 9",
    moneyIn: 16987.35,
    moneyOut: 22987.5,
    percentFee: 492.63,
    fixedFee: 30.96,
    newWishlist: 10,
    ongoingWishlist: 50,
    closedWishlist: 20,
  },
  {
    key: "9",
    week: "Mar 10 - 16",
    moneyIn: 43987.6,
    moneyOut: 15983.7,
    percentFee: 1275.64,
    fixedFee: 111.96,
    newWishlist: 25,
    ongoingWishlist: 58,
    closedWishlist: 32,
  },
];
function AdminDashboardPage() {
  const [loading, setLoading] = useState(true);
  const [selectedMenu, setSelectedMenu] = useState("home");
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);
  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* Sider: sidebar menu */}
      <Sider collapsible>
        <div
          style={{
            height: 64,
            margin: 16,
            background: "rgba(255,255,255,0.2)",
          }}
        >
          {/* You can put a logo or just leave blank */}
        </div>
        <Menu
          theme="dark"
          selectedKeys={[selectedMenu]}
          mode="inline"
          onClick={({ key }) => setSelectedMenu(key)}
        >
          <Menu.Item key="home" icon={<HomeOutlined />}>
            Home
          </Menu.Item>
          <Menu.Item key="transaction" icon={<BarChartOutlined />}>
            Transaction
          </Menu.Item>
        </Menu>
      </Sider>

      {/* Main layout */}
      <Layout>
        {/* Header */}
        <Header style={{ background: "#001529", padding: "0 16px" }}>
          <h2 style={{ color: "#fff", margin: 0, lineHeight: "64px" }}>
            Admin Dashboard
          </h2>
        </Header>

        {/* Content area for home */}
        {selectedMenu === "home" && loading && (
          <span className="loading loading-spinner loading-lg block text-center"></span>
        )}
        {selectedMenu === "home" && !loading && (
          <Content style={{ margin: "16px" }}>
            <div>
              <h2>Summary for Users and Wishlists</h2>
              <div style={{ display: "flex", gap: 16, marginBottom: 16 }}>
                <div
                  style={{
                    background: "#f0f2f5",
                    padding: 16,
                    borderRadius: 8,
                    flex: 1,
                  }}
                >
                  <h3>Users(created accounts)</h3>
                  <p style={{ fontSize: 24, margin: 0 }}>167</p>
                </div>
                <div
                  style={{
                    background: "#f0f2f5",
                    padding: 16,
                    borderRadius: 8,
                    flex: 1,
                  }}
                >
                  <h3>Wishlists total</h3>
                  <p style={{ fontSize: 24, margin: 0 }}>113</p>
                </div>
              </div>
              <h2 style={{ marginBottom: 16 }}>
                Money Flow, Wishlist details Summary
              </h2>
              {/* Data Table */}
              <Table
                columns={columns}
                dataSource={tableData}
                pagination={{ pageSize: 10 }} // Adjust this number to display more rows per page
                rowKey="key"
                summary={() => {
                  // Calculate totals for revenue and wishlist numbers
                  const totalPercentFee = tableData.reduce(
                    (sum, record) => sum + record.percentFee,
                    0
                  );
                  const totalFixedFee = tableData.reduce(
                    (sum, record) => sum + record.fixedFee,
                    0
                  );
                  const totalNewWishlist = tableData.reduce(
                    (sum, record) => sum + record.newWishlist,
                    0
                  );
                  const totalClosedWishlist = tableData.reduce(
                    (sum, record) => sum + record.closedWishlist,
                    0
                  );

                  return (
                    <Table.Summary.Row>
                      <Table.Summary.Cell index={0}>Summary</Table.Summary.Cell>
                      <Table.Summary.Cell index={1} />
                      <Table.Summary.Cell index={2} />{" "}
                      {/* Money In: left empty */}
                      <Table.Summary.Cell index={3} />{" "}
                      {/* Money Out: left empty */}
                      <Table.Summary.Cell index={4}>
                        {totalPercentFee.toFixed(2)}
                      </Table.Summary.Cell>
                      <Table.Summary.Cell index={5}>
                        {totalFixedFee.toFixed(2)}
                      </Table.Summary.Cell>
                      <Table.Summary.Cell index={6}>
                        {totalNewWishlist}
                      </Table.Summary.Cell>
                      <Table.Summary.Cell index={7}>
                        {totalClosedWishlist}
                      </Table.Summary.Cell>
                    </Table.Summary.Row>
                  );
                }}
              />
            </div>
          </Content>
        )}
        {/* Content area for transaction */}
        {selectedMenu === "transaction" && <TransactionPageContent />}
      </Layout>
    </Layout>
  );
}

function TransactionPageContent() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      toast.error(
        "Unauthorized, please contact tech support for authorization"
      );
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Content style={{ margin: "16px" }}>
      <Toaster />
      {loading && (
        <span className="loading loading-spinner loading-lg mb-5 block text-center"></span>
      )}
    </Content>
  );
}

export default AdminDashboardPage;

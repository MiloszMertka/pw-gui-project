import Widget from "../shared/Widget";
import { Col, Form, FormGroup, Input, Label } from "reactstrap";
import { useEffect, useMemo, useState } from "react";
import { Bar, Line } from "react-chartjs-2";
import { useDispatch, useSelector } from "react-redux";
import { loadStatistics } from "../../state/slices/sellStatisticsSlice";
import { useTranslation } from "react-i18next";

const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
  },
};

function SellingChartWidget() {
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const sellStatistics = useSelector((state) => state.sellStatistics);
  const account = useSelector((state) => state.auth.activeAccount.internalName);

  const [measure, setMeasure] = useState("earnings");
  const [timespan, setTimespan] = useState("today");
  const [chartType, setChartType] = useState("lineChart");
  const [showPreviousData, setShowPreviousData] = useState(false);

  useEffect(() => {
    dispatch(
      loadStatistics({
        account,
        measure,
        timespan,
      }),
    );
  }, [measure, timespan, account]);

  const data = useMemo(() => {
    const labels =
      timespan === "today"
        ? sellStatistics.labels
        : sellStatistics.labels.map((label) => t(label));
    const datasets = showPreviousData
      ? sellStatistics.datasets
      : [sellStatistics.datasets[0]];

    const datasetsWithColors = [
      {
        label: t(datasets[0].label),
        data: datasets[0].data,
        backgroundColor: "rgb(119, 73, 248)",
        borderColor: "rgb(119, 73, 248)",
      },
    ];

    if (showPreviousData) {
      datasetsWithColors.push({
        label: t(datasets[1].label),
        data: datasets[1].data,
        backgroundColor: "rgb(29, 198, 207)",
        borderColor: "rgb(29, 198, 207)",
      });
    }

    return {
      labels,
      datasets: datasetsWithColors,
    };
  }, [sellStatistics, showPreviousData]);

  const measures = [
    { label: t("earnings"), value: "earnings" },
    { label: t("numberOfProductsSold"), value: "soldAmount" },
  ];

  const timespans = [
    { label: t("today"), value: "today" },
    { label: t("currentWeek"), value: "currentWeek" },
    { label: t("previousWeek"), value: "previousWeek" },
  ];

  const chartTypes = [
    { label: t("lineChart"), value: "lineChart" },
    { label: t("barChart"), value: "barChart" },
  ];

  return (
    <Widget heading={t("sellingChart")}>
      <Form className="px-3">
        <FormGroup row>
          <Label htmlFor="measure" sm={4} className="text-body-secondary">
            {t("measure")}:
          </Label>
          <Col sm={8}>
            <Input
              type="select"
              id="measure"
              name="measure"
              className="text-body-secondary"
              value={measure.value}
              onChange={(event) => setMeasure(event.currentTarget.value)}
            >
              {measures.map((measure) => (
                <option key={measure.value} value={measure.value}>
                  {measure.label}
                </option>
              ))}
            </Input>
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label htmlFor="timespan" sm={4} className="text-body-secondary">
            {t("timespan")}:
          </Label>
          <Col sm={8}>
            <Input
              type="select"
              id="timespan"
              name="timespan"
              className="text-body-secondary"
              value={timespan.value}
              onChange={(event) => setTimespan(event.currentTarget.value)}
            >
              {timespans.map((timespan) => (
                <option key={timespan.value} value={timespan.value}>
                  {timespan.label}
                </option>
              ))}
            </Input>
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label htmlFor="chartType" sm={4} className="text-body-secondary">
            {t("chartType")}:
          </Label>
          <Col sm={8}>
            <Input
              type="select"
              id="chartType"
              name="chartType"
              className="text-body-secondary"
              value={chartType.value}
              onChange={(event) => setChartType(event.currentTarget.value)}
            >
              {chartTypes.map((chartType) => (
                <option key={chartType.value} value={chartType.value}>
                  {chartType.label}
                </option>
              ))}
            </Input>
          </Col>
        </FormGroup>
        <FormGroup check>
          <Input
            type="checkbox"
            id="showPreviousData"
            name="showPreviousData"
            className="primary"
            checked={showPreviousData}
            onChange={(event) =>
              setShowPreviousData(event.currentTarget.checked)
            }
          />
          <Label htmlFor="showPreviousData" check>
            {t("showDataFromPreviousPeriod")}
          </Label>
        </FormGroup>
      </Form>
      <div className="p-3">
        {chartType === "lineChart" ? (
          <Line data={data} options={chartOptions} />
        ) : (
          <Bar data={data} options={chartOptions} />
        )}
      </div>
    </Widget>
  );
}

export default SellingChartWidget;

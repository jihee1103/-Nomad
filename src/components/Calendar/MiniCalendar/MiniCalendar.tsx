import Cal from 'react-calendar';
import moment from 'moment';

interface MiniCalenderProps {
  onChange?: (e: any) => void;
  onClickDay?: (e: any) => void;
  onActiveDateChange?: ({
    activeStartDate,
  }: {
    activeStartDate: Date | null;
  }) => void;
  titleContent?: ({
    date,
    view,
  }: {
    date: Date;
    view: string;
  }) => React.ReactNode;
  value?: any;
}

export default function MiniCalendar({
  onClickDay,
  onActiveDateChange,
  titleContent,
}: MiniCalenderProps) {
  return (
    <div>
      <Cal
        locale="ko-KR"
        calendarType="gregory"
        formatDay={(locale, date) => moment(date).format('D')}
        formatMonthYear={(locale, date) => moment(date).format('YYYY. MM')}
        onClickDay={onClickDay}
        onActiveStartDateChange={onActiveDateChange}
        tileContent={titleContent}
      />
    </div>
  );
}

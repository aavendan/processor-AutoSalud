export interface MuestrasInterface {
  code: string;
  position: number;
  date: string;
  cardid: string;
  reference: string;
  transfered: string;
}

export const MUESTRAS: MuestrasInterface[] = [
  {position: 1, code: 'M811', cardid: '0912345678', date: '01/05/2020', reference: 'hermano', transfered: 'center-1'},
  {position: 2, code: 'M812', cardid: '0912302678', date: '02/05/2020', reference: 'propio', transfered: 'center-1'},
  {position: 3, code: 'M411', cardid: '0912345600', date: '03/05/2020', reference: 'hermana', transfered: 'center-1'},
  {position: 4, code: 'M839', cardid: '0911345678', date: '29/04/2020', reference: 'hija', transfered: 'center-1'},
  {position: 5, code: 'M823', cardid: '0912245678', date: '30/04/2020', reference: 'hijo', transfered: 'center-1'},
  {position: 6, code: 'M293', cardid: '0912345578', date: '01/05/2020', reference: 'papá', transfered: 'center-2'},
  {position: 7, code: 'M092', cardid: '0912345678', date: '02/05/2020', reference: 'propio', transfered: 'center-2'},
  {position: 8, code: 'M378', cardid: '0912843478', date: '02/05/2020', reference: 'propio', transfered: 'center-2'},
  {position: 9, code: 'M328', cardid: '0912843478', date: '31/03/2020', reference: 'propio', transfered: 'center-2'},
  {position: 10, code: 'M372', cardid: '0912843478', date: '01/03/2020', reference: 'propio', transfered: 'center-2'},
  {position: 11, code: 'M815', cardid: '0912843478', date: '01/05/2020', reference: 'hermano', transfered: 'center-2'},
  {position: 12, code: 'M817', cardid: '0912843478', date: '02/05/2020', reference: 'propio', transfered: 'center-2'},
  {position: 13, code: 'M413', cardid: '0912843478', date: '03/05/2020', reference: 'hermana', transfered: 'center-3'},
  {position: 14, code: 'M899', cardid: '0912843478', date: '29/04/2020', reference: 'hija', transfered: 'center-3'},
  {position: 15, code: 'M843', cardid: '0912843478', date: '30/04/2020', reference: 'hijo', transfered: 'center-3'},
  {position: 16, code: 'M203', cardid: '0912843478', date: '01/05/2020', reference: 'papá', transfered: 'center-3'},
  {position: 17, code: 'M492', cardid: '0912843478', date: '02/05/2020', reference: 'propio', transfered: 'center-3'},
  {position: 18, code: 'M367', cardid: '0912843477', date: '02/05/2020', reference: 'propio', transfered: 'center-3'},
  {position: 19, code: 'M258', cardid: '0912844474', date: '31/03/2020', reference: 'propio', transfered: 'center-3'},
  {position: 20, code: 'M382', cardid: '0912848478', date: '01/03/2020', reference: 'propio', transfered: 'center-3'},
];

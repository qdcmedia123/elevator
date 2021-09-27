import mongoose from "mongoose";

const plantSchema = new mongoose.Schema({
  SEQPLT19: {
    type: String,
  },
  YEAR: {
    type: String,
  },
  PSTATABB: {
    type: String,
  },
  PNAME: {
    type: String,
  },
  ORISPL: {
    type: String,
  },
  OPRNAME: {
    type: String,
  },
  OPRCODE: {
    type: String,
  },
  UTLSRVNM: {
    type: String,
  },
  UTLSRVID: {
    type: String,
  },
  SECTOR: {
    type: String,
  },
  BANAME: {
    type: String,
  },
  BACODE: {
    type: String,
  },
  NERC: {
    type: String,
  },
  SUBRGN: {
    type: String,
  },
  SRNAME: {
    type: String,
  },
  ISORTO: {
    type: String,
  },
  FIPSST: {
    type: String,
  },
  FIPSCNTY: {
    type: String,
  },
  CNTYNAME: {
    type: String,
  },
  LAT: {
    type: String,
    index: true
  },
  LON: {
    type: String,
    index: true
  },
  NUMUNT: {
    type: String,
  },
  NUMGEN: {
    type: String,
  },
  PLPRMFL: {
    type: String,
  },
  PLFUELCT: {
    type: String,
  },
  COALFLAG: {
    type: String,
  },
  CAPFAC: {
    type: String,
  },
  NAMEPCAP: {
    type: String,
  },
  NBFACTOR: {
    type: String,
  },
  RMBMFLAG: {
    type: String,
  },
  CHPFLAG: {
    type: String,
  },
  USETHRMO: {
    type: String,
  },
  PWRTOHT: {
    type: String,
  },
  ELCALLOC: {
    type: String,
  },
  PSFLAG: {
    type: String,
  },
  PLHTIAN: {
    type: String,
  },
  PLHTIOZ: {
    type: String,
  },
  PLHTIANT: {
    type: String,
  },
  PLHTIOZT: {
    type: String,
  },
  PLNGENAN: {
    type: Number,
  },
  PLNGENOZ: {
    type: String,
  },
  PLNOXAN: {
    type: String,
  },
  PLNOXOZ: {
    type: String,
  },
  PLSO2AN: {
    type: String,
  },
  PLCO2AN: {
    type: String,
  },
  PLCH4AN: {
    type: String,
  },
  PLN2OAN: {
    type: String,
  },
  PLCO2EQA: {
    type: String,
  },
  PLHGAN: {
    type: String,
  },
  PLNOXRTA: {
    type: String,
  },
  PLNOXRTO: {
    type: String,
  },
  PLSO2RTA: {
    type: String,
  },
  PLCO2RTA: {
    type: String,
  },
  PLCH4RTA: {
    type: String,
  },
  PLN2ORTA: {
    type: String,
  },
  PLC2ERTA: {
    type: String,
  },
  PLHGRTA: {
    type: String,
  },
  PLNOXRA: {
    type: String,
  },
  PLNOXRO: {
    type: String,
  },
  PLSO2RA: {
    type: String,
  },
  PLCO2RA: {
    type: String,
  },
  PLCH4RA: {
    type: String,
  },
  PLN2ORA: {
    type: String,
  },
  PLC2ERA: {
    type: String,
  },
  PLHGRA: {
    type: String,
  },
  PLNOXCRT: {
    type: String,
  },
  PLNOXCRO: {
    type: String,
  },
  PLSO2CRT: {
    type: String,
  },
  PLCO2CRT: {
    type: String,
  },
  PLCH4CRT: {
    type: String,
  },
  PLN2OCRT: {
    type: String,
  },
  PLC2ECRT: {
    type: String,
  },
  PLHGCRT: {
    type: String,
  },
  UNNOX: {
    type: String,
  },
  UNNOXOZ: {
    type: String,
  },
  UNSO2: {
    type: String,
  },
  UNCO2: {
    type: String,
  },
  UNCH4: {
    type: String,
  },
  UNN2O: {
    type: String,
  },
  UNHG: {
    type: String,
  },
  UNHTI: {
    type: String,
  },
  UNHTIOZ: {
    type: String,
  },
  UNHTIT: {
    type: String,
  },
  UNHTIOZT: {
    type: String,
  },
  UNNOXSRC: {
    type: String,
  },
  UNNOZSRC: {
    type: String,
  },
  UNSO2SRC: {
    type: String,
  },
  UNCO2SRC: {
    type: String,
  },
  UNCH4SRC: {
    type: String,
  },
  UNN2OSRC: {
    type: String,
  },
  UNHGSRC: {
    type: String,
  },
  UNHTISRC: {
    type: String,
  },
  UNHOZSRC: {
    type: String,
  },
  BIONOX: {
    type: String,
  },
  BIONOXOZ: {
    type: String,
  },
  BIOSO2: {
    type: String,
  },
  BIOCO2: {
    type: String,
  },
  BIOCH4: {
    type: String,
  },
  BION2O: {
    type: String,
  },
  CHPCHTI: {
    type: String,
  },
  CHPCHTIOZ: {
    type: String,
  },
  CHPNOX: {
    type: String,
  },
  CHPNOXOZ: {
    type: String,
  },
  CHPSO2: {
    type: String,
  },
  CHPCO2: {
    type: String,
  },
  CHPCH4: {
    type: String,
  },
  CHPN2O: {
    type: String,
  },
  PLHTRT: {
    type: String,
  },
  PLGENACL: {
    type: String,
  },
  PLGENAOL: {
    type: String,
  },
  PLGENAGS: {
    type: String,
  },
  PLGENANC: {
    type: String,
  },
  PLGENAHY: {
    type: String,
  },
  PLGENABM: {
    type: String,
  },
  PLGENAWI: {
    type: String,
  },
  PLGENASO: {
    type: String,
  },
  PLGENAGT: {
    type: String,
  },
  PLGENAOF: {
    type: String,
  },
  PLGENAOP: {
    type: String,
  },
  PLGENATN: {
    type: String,
  },
  PLGENATR: {
    type: String,
  },
  PLGENATH: {
    type: String,
  },
  PLGENACY: {
    type: String,
  },
  PLGENACN: {
    type: String,
  },
  PLCLPR: {
    type: String,
  },
  PLOLPR: {
    type: String,
  },
  PLGSPR: {
    type: String,
  },
  PLNCPR: {
    type: String,
  },
  PLHYPR: {
    type: String,
  },
  PLBMPR: {
    type: String,
  },
  PLWIPR: {
    type: String,
  },
  PLSOPR: {
    type: String,
  },
  PLGTPR: {
    type: String,
  },
  PLOFPR: {
    type: String,
  },
  PLOPPR: {
    type: String,
  },
  PLTNPR: {
    type: String,
  },
  PLTRPR: {
    type: String,
  },
  PLTHPR: {
    type: String,
  },
  PLCYPR: {
    type: String,
  },
  PLCNPR: {
    type: String,
  },
});



const Plant = mongoose.model("Plant", plantSchema);
export  { Plant }; 

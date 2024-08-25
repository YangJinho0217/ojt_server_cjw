const multer = require("multer");


// 파일 업로드 위치 지정
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const prj_id = req.body.prj_id; // prj_id를 요청 바디에서 가져오기
    const version_id = req.body.version_id; // version_id를 요청 바디에서 가져오기

    // // 최종 저장 경로 지정
    cb(null, process.env.PWD + '/src/file/');

    // 기본 업로드 경로
    // const uploadPath = path.join('file', prj_id, version_id);

    // // prj_id 경로가 없으면 생성
    // if (!fs.existsSync(path.join('file', prj_id))) {
    //   fs.mkdirSync(path.join('file', prj_id), { recursive: true });
    // }

    // // version_id 경로가 없으면 생성
    // if (!fs.existsSync(uploadPath)) {
    //   fs.mkdirSync(uploadPath, { recursive: true });
    // }

    // // 최종 저장 경로 지정
    // cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    // 일단 임시로 중복저장 허용하기 위해 Date.now 사용
    cb(null, getDate() + '.' + file.originalname);
  },
});


/* 이미지 링크 DB 저장 시 DATE 값을 앞에 추가 후 저장 하고 있음 */
/* DATE값 추출 function */
function getDate() {

  var today = new Date();

  var year = today.getFullYear();
  var month = ('0' + (today.getMonth() + 1)).slice(-2);
  var day = ('0' + today.getDate()).slice(-2);

  var dateString = year + month + day;

  var hours = ('0' + today.getHours()).slice(-2); 
  var minutes = ('0' + today.getMinutes()).slice(-2);
  var seconds = ('0' + today.getSeconds()).slice(-2); 

  var timeString = hours + '.' + minutes  + '.' + seconds;

  var fullString = dateString +  '.' + timeString

  return  fullString
}

const upload = multer({ storage: storage });

module.exports = upload;

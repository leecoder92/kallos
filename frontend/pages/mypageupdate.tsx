/* eslint-disable */
import { FC, useEffect, useState } from "react";
import {
  Typography,
  Grid,
  Box,
  TextField,
  Stack,
  Button,
  styled,
} from "@mui/material";
import { updateUserInfo } from "@/store/modules/user";
import { RootState } from "../store/modules";
import { connect } from "react-redux";
import defaultProfile from "../public/images/defaultProfile.png";
import Image from "next/image";
import Link from "next/link";
import { getUserInfo } from "@/store/modules/user";
import axios from "axios";

const ColorButton = styled(Button)({
  backgroundColor: "#F9E6E1",
  color: "black",
  width: "400px",
  "&:hover": {
    backgroundColor: "#F9E6E1",
    color: "black",
  },
});

const EmptyButton = styled(Button)({
  //   backgroundColor: "none",
  color: "#F9E6E1",
  border: "2px solid #F9E6E1",
  width: "400px",
  "&:hover": {
    border: "2px solid #f7b5a3",
    backgroundColor: "#ffffff",
    color: "#f7b5a3",
  },
});

const mapStateToProps = (state: RootState) => {
  return {
    userInfo: state.userReducer.userInfo,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    setUserInfo: (userAddress) => dispatch(getUserInfo(userAddress)),
    updateUserInfo: (sendData) => dispatch(updateUserInfo(sendData)),
  };
};

interface ParamObj {
  account: string;
  userInfo: any;
  setUserInfo: any;
  updateUserInfo: any;
}

const MyPageUpdate: FC<ParamObj> = ({
  account,
  userInfo,
  setUserInfo,
  updateUserInfo,
}) => {
  const [loaded, setLoaded] = useState(false);
  let inputRef: any;

  const [image, setImage] = useState<any>({
    image_file: "",
    preview_URL: defaultProfile,
  });

  const [profileImage, setProfileImage] = useState("");

  const [userName, setUserName] = useState<string>(userInfo.name);
  const [userDescription, setUserDescription] = useState<string>(
    userInfo.description
  );

  const onChangeName = (e) => {
    setUserName(e.target.value);
  };

  const onChangeDescription = (e) => {
    setUserDescription(e.target.value);
  };

  async function onChange(e) {
    const file = e.target.files[0];
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    const fileReader = new FileReader();

    if (e.target.files[0]) {
      setProfileImage(e.target.files[0]);
      fileReader.readAsDataURL(e.target.files[0]);
    }
    let new_image;
    fileReader.onload = () => {
      new_image = fileReader.result;
      setImage({
        image_file: e.target.files[0],
        preview_URL: new_image,
      });
      setLoaded(true);
    };
  }

  // const onChangeInfo = () => {
  //   console.log(sendData);
  //   updateUserInfo(sendData);
  // };

  const onChangeInfo = async () => {
    const formData = new FormData();
    formData.append("address", account);
    formData.append("name", userName);
    formData.append("description", userDescription);
    formData.append("profile_img", profileImage);

    await axios
      .put("https://j6c107.p.ssafy.io:8443/api/user/mypageupdate", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => {
        if (res.status === 200) {
          alert("수정이 완료되었습니다.");
          window.location.href = "/mypage";
        }
      })
      .catch((err) => {
        alert("중복된 닉네임입니다.");
      });
  };

  useEffect(() => {
    if (!account) return;

    setUserInfo(account);

    if (userInfo.profile_img !== null) {
      const profileImage = `https://kallosimages.s3.ap-northeast-2.amazonaws.com/profileImages/${userInfo.profile_img}`;
      setImage({
        image_file: "",
        preview_URL: profileImage,
      });
    }
  }, [account]);

  return (
    <div className="viewContainer">
      {userInfo.user_id ? (
        <Box
          sx={{
            alignItems: "center",
          }}
        >
          <Typography variant="h3" align="center" sx={{ mb: 10 }}>
            회원 정보 수정
          </Typography>
          <Stack
            direction="row"
            spacing={20}
            alignItems="center"
            justifyContent="center"
          >
            <Stack>
              <input
                type="file"
                accept="image/*"
                ref={(refParam) => (inputRef = refParam)}
                onChange={onChange}
                style={{ display: "none" }}
              />
              <div
                style={{
                  borderRadius: "100px",
                  overflow: "hidden",
                  height: "200px",
                }}
              >
                {loaded === false || loaded === true ? (
                  <Image
                    src={image.preview_URL}
                    alt="preview-image"
                    width="200px"
                    height="200px"
                  />
                ) : (
                  <span>이미지를 불러오는 중입니다.</span>
                )}
              </div>
              <ColorButton
                variant="contained"
                sx={{ mt: 5, width: 200 }}
                onClick={() => inputRef.click()}
              >
                프로필 이미지 변경
              </ColorButton>
              {/* <Image
              src={defaultProfile}
              alt="profile image"
              width="200px"
              height="200px"
            />
            <Button variant="contained" sx={{ mt: 5 }}>
              프로필 이미지 변경
            </Button> */}
            </Stack>
            <Stack>
              <Stack
                sx={{
                  alignItems: "left",
                }}
              >
                <Stack direction="row" spacing={2} alignItems="center">
                  <Typography sx={{ width: 50 }}>이름</Typography>
                  {/* <Typography sx={{ width: 50 }}>{userInfo.name}</Typography> */}
                  <TextField
                    defaultValue={userInfo.name}
                    onChange={onChangeName}
                  ></TextField>
                </Stack>
                <Stack
                  direction="row"
                  spacing={2}
                  sx={{ mt: 4 }}
                  alignItems="center"
                >
                  <Typography sx={{ width: 50 }}>소개글</Typography>
                  {userInfo.description === null ||
                  userInfo.description === "null" ? (
                    <TextField onChange={onChangeDescription}></TextField>
                  ) : (
                    <TextField
                      defaultValue={userInfo.description}
                      onChange={onChangeDescription}
                    ></TextField>
                  )}
                </Stack>
                <Grid
                  direction="row"
                  spacing={4}
                  sx={{ mt: 4 }}
                  alignItems="right"
                ></Grid>
              </Stack>
            </Stack>
          </Stack>
          <Stack
            alignItems="center"
            sx={{ mt: 10 }}
            spacing={10}
            direction="row"
            justifyContent="center"
          >
            <Link href="/mypage">
              <EmptyButton variant="text" sx={{ width: 150 }}>
                취소
              </EmptyButton>
            </Link>
            <ColorButton
              variant="contained"
              sx={{ width: 150 }}
              onClick={onChangeInfo}
            >
              수정 완료
            </ColorButton>
          </Stack>
        </Box>
      ) : null}
      <style jsx>
        {`
          .viewContainer {
            padding: 150px 200px;
          }
        `}
      </style>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(MyPageUpdate);

import React, { FunctionComponent } from "react";

import {
  Container,
  Box,
  Input,
  Button,
  InputLabel,
  Typography,
  InputAdornment,
  IconButton,
  // Customizable Area Start
  Avatar,
  Badge,
  Card,
  CardHeader,
  CardContent,
  CardMedia,
  CardActions,
  Grid,
  Modal,
  TextField,
  Tooltip,
  FormControl,
  FormHelperText,
  CircularProgress,
  // Customizable Area End
} from "@material-ui/core";

// Customizable Area Start
import { AvatarGroup, Alert, Skeleton } from "@material-ui/lab";
import {
  createTheme,
  ThemeProvider,
  styled,
  makeStyles,
} from "@material-ui/core/styles";
import { Close, CloudUploadOutlined, EditOutlined } from "@material-ui/icons";
import { modalImage } from "./assets";

const theme = createTheme({
  typography: {
    fontFamily: "sans-serif",
    fontSize: 16,
  },
});

// Customizable Area End

import WorkspaceManagementController, {
  Props,
} from "./WorkspaceManagementController";

export default class WorkspaceManagement extends WorkspaceManagementController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start

    // Customizable Area End
  }

  // Customizable Area Start
  handleButtonAction = () => {
    if (this.state.edit) {
      return this.saveWorkspace();
    }

    return this.addWorkspace();
  };

  handleButtonCancel = () => {
    this.resetWorkspace();
  };

  handleModal = () => {
    this.setState((prev) => {
      return { open: !prev.open };
    }, () => {
      // this.getAdminData(this.state.edit);
    });
  };

  handleWorkspaceEdit = (id: string) => {
    this.state.workspaces.map((workspace: any) => {
      if (workspace.id === id) {
        const adminString = workspace.attributes.admins.data
          .map(
            (user: any) =>
              user.attributes.first_name + " " + user.attributes.last_name
          )
          .join("; ");
        this.setState(
          (prev) => {
            return {
              ...prev,
              edit: true,
              title: workspace.attributes.name,
              description: workspace.attributes.description,
              workspace_id: workspace.id,
              coverImg: workspace.attributes.image,
              admins: workspace.attributes.admins.data,
              adminString,
            };
          },
          () => {
            this.handleModal();
          }
        );
        return workspace;
      }
      return undefined;
    });
    // .filter((unit: any) => unit !== undefined);
  };

  handleDescription = (event: any) => {
    const value = event.target.value;
    if (value.length < 300) {
      this.setState((prev) => {
        return { ...prev, description: value, descriptionError: "" };
      });
      return;
    }
    return;
  };

  modalBreakpoint(payload: string) {
    if (!payload) return;
    const keyword = "Successfully";
    const [first, _] = payload.split(keyword);
    return (
      <>
        {first}
        <br />
        {keyword}!
      </>
    );
  }

  handleTitleChange = (event: any) => {
    const value = event.target.value;
    this.setState({ title: value, titleError: "", });
  };

  handleImageSelect = (event: any) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        this.setState(
          { coverImg: reader.result, coverImgFile: file, coverImgError: "" },
          () => { }
        );
      }
    };
    reader.readAsDataURL(file);
  };

  handleSearch = (event: any) => {
    const value = event.target.value;
    this.setState({ searchValue: value, adminStringError: "" }, () => {
      this.getAdminData(this.state.edit);
    });
  };

  renderAdmins() {
    if (!this.state.admins.length) return
    const admins = this.state.admins.map(
      (user: any) =>
        `${user.attributes.first_name} ${user.attributes.last_name}`
    );

    this.setState({ adminString: admins.join("; ") });
  }

  handleSearchItemClick(payload: any) {
    const data = this.state.admins.filter((user: any) => user.id === payload.id)
      .length;

    if (data) return;
    this.setState(
      (prev) => {
        return {
          ...prev,
          admins: prev.admins.concat(payload),
        };
      },
      () => {
        this.renderAdmins();
      }
    );
  }

  handleSearchCloseClick(id: string) {
    this.setState(
      {
        admins: this.state.admins.filter((user: any) => String(user.id) !== id),
      },
      () => {
        this.renderAdmins();
      }
    );
  }

  // Components/Functions
  FormRow(row: any) {
    const nerfNames = (data: string) => {
      if (data) {
        const charLength = 10;
        if (data.length > 8) {
          const processedString = data.substring(0, charLength).concat("..");
          return processedString.length <= 11 ? data : processedString;
        }
      }
      return data;
    };

    const results =
      row &&
      row.map((user: any) => {
        const name = user.attributes.first_name
          ? `${user.attributes.first_name} ${user.attributes.last_name}`
          : "default";

        const imgPartial = this.parseImg(user.attributes.image);

        return (
          <React.Fragment key={user.id}>
            <Grid item xs={4} key={user.id}>
              <Box style={{ ...styles.formRoot }}>
                <Avatar
                  style={styles.formAvatar}
                  alt={name}
                  src={imgPartial}
                  key={name}
                />

                {/* <img
                  src={imgPartial}
                  alt={name}
                  style={{
                    height: "32px",
                    objectFit: "cover",
                    aspectRatio: "1/1",
                    borderRadius: "50%",
                    padding: ".5rem",
                  }}
                /> */}

                <Box
                  component="span"
                  style={styles.formTextContainer}
                  onClick={() => this.handleSearchItemClick(user)}
                >
                  <Tooltip title={name} aria-label={`tooltip-${name}`}>
                    <Typography noWrap={true} style={styles.formToolTypography}>
                      {nerfNames(name)}
                    </Typography>
                  </Tooltip>
                </Box>
                <IconButton
                  size="small"
                  onClick={() => this.handleSearchCloseClick(user.id)}
                >
                  <Close fontSize="small" />
                </IconButton>
              </Box>
            </Grid>
          </React.Fragment>
        );
      });
    return <React.Fragment>{results}</React.Fragment>
  }

  FilterResults() {
    const row: any = this.state.workspaceAdminData;
    const searches = row.filter((user: any) => {
      const name = user.attributes.first_name
        ? `${user.attributes.first_name} ${user.attributes.last_name}`
        : "default";
      return name.trim().toLowerCase().includes(this.state.searchValue)
    })

    return (
      this.state.searchValue.trim().length && searches.length ? (
        <React.Fragment>
          <Box style={styles.filterContainer}>
            <Grid container spacing={1}>
              {this.FormRow(searches)}
            </Grid>
          </Box>
        </React.Fragment>
      ) : null
    );
  }

  AdminRow(row: any) {
    const nerfNames = (data: string) => {
      if (data) {
        const charLength = 10;
        if (data.length > 8) {
          const processedString = data.substring(0, charLength).concat("..");
          return processedString.length <= 11 ? data : processedString;
        }
      }
      return data;
    };

    const results =
      row &&
      row.map((user: any) => {
        const excessstyle = this.state.admins
          .map((admin: any) => {
            if (String(admin.id) !== user.id) return undefined;
            return admin.id;
          })
          .filter((item: string | undefined) => item !== undefined).length
          ? styles.formActivePick
          : {};

        const name = user.attributes.first_name
          ? `${user.attributes.first_name} ${user.attributes.last_name}`
          : "default";

        const imgPartial = this.parseImg(user.attributes.image);

        return (
          <React.Fragment key={user.id}>
            <Grid item xs={4} key={user.id}>
              <Box style={{ ...styles.formRoot, ...excessstyle }}>
                <Avatar
                  style={styles.formAvatar}
                  alt={name}
                  src={imgPartial}
                  key={name}
                />

                <Box
                  component="span"
                  style={styles.formTextContainer}
                  onClick={() => this.handleSearchItemClick(user)}
                >
                  <Tooltip title={name} aria-label={`tooltip-${name}`}>
                    <Typography noWrap={true} style={styles.formToolTypography}>
                      {nerfNames(name)}
                    </Typography>
                  </Tooltip>
                </Box>
                <IconButton
                  size="small"
                  onClick={() => this.handleSearchCloseClick(user.id)}
                  style={styles.excessIcon}
                >
                  <Close fontSize="small" />
                </IconButton>
              </Box>
            </Grid>
          </React.Fragment>
        );
      });
    return <React.Fragment>{results}</React.Fragment>;
  }

  AdminResults() {
    const row: any = this.state.admins;
    return (
      <React.Fragment>
        <Box style={styles.filterContainer}>
          <Grid container spacing={1}>
            {this.AdminRow(row)}
          </Grid>
        </Box>
      </React.Fragment>

    );
  }

  WorkSpace() {
    const workspaces = this.state.workspaces;
    const result =
      workspaces &&
      workspaces.map((workspace: any) => {
        const avatars = workspace.attributes.admins.data.map(
          (user: any, int: number) => {
            const imgPartial = this.parseImg(user.attributes.image);
            const name = user.attributes.first_name
              ? `${user.attributes.first_name} ${user.attributes.last_name}`
              : "default";

            return (
              <Tooltip title={name} aria-label={`tooltip-${name}`} key={int}>
                <Avatar
                  style={styles.workspaceAvatar}
                  alt={user.attributes.first_name}
                  src={imgPartial}
                />
              </Tooltip>
            );
          }
        );

        const imgPartial = this.parseImg(workspace.attributes.image);
        // const altPartial = workspace.attributes.name
        //   ? workspace.attributes.name.toLowerCase()
        //   : null;
        const altPartial = "No image"
        // workspace.attributes.name
        //   ? workspace.attributes.name.toLowerCase()
        //   : null;
        return (
          <React.Fragment key={workspace.id} >
            <Grid item sm={12} md={6} lg={4}>
              <Card style={styles.workspaceCardRoot} variant="outlined">
                <StyledBadge
                  badgeContent={
                    <IconButton
                      disableRipple={true}
                      onClick={() => this.handleWorkspaceEdit(workspace.id)}
                      aria-label="edit-icon"
                      style={styles.workspaceIconButton}
                    >
                      <EditOutlined />
                    </IconButton>
                  }
                >
                  <Card variant="outlined" style={styles.workspaceStyledCard}>
                    <CardMedia
                      component="img"
                      src={imgPartial}
                      alt={altPartial}
                    />
                  </Card>
                </StyledBadge>

                <CardContent>
                  <Typography
                    variant="subtitle1"
                    color="textSecondary"
                    style={styles.workspaceId}
                  >
                    ID : {workspace.id}
                  </Typography>
                  <Typography
                    gutterBottom
                    variant="h6"
                    component="div"
                    style={styles.workspaceName}
                  >
                    {workspace.attributes.name}
                  </Typography>

                  <Container style={styles.descriptionContainer}>
                    <Typography variant="body2" color="textSecondary">
                      {workspace.attributes.description}
                    </Typography>
                  </Container>
                </CardContent>
                {/* <IconButton
                  disableRipple={true}
                  onClick={this.deleteWorkspace(workspace.id)}
                  aria-label="edit-icon"
                  style={styles.workspaceIconButton}
                >
                  <DeleteForeverOutlined />
                </IconButton> */}

                <CardActions style={styles.cardActions}>
                  <Typography variant="body2" color="textSecondary">
                    Admin
                  </Typography>
                  <AvatarGroup max={5}>{avatars}</AvatarGroup>
                </CardActions>
              </Card>
            </Grid>
          </React.Fragment>
        );
      });

    return result;
  }
  // Customizable Area End
  render() {
    const resultsFilter =
      Boolean(this.state.workspaceAdminData.length) && this.FilterResults();
    const adminFilter = Boolean(this.state.admins.length) && this.AdminResults();
    const loadWorkspace = this.WorkSpace();

    const BadgeFragment: FunctionComponent = () => {
      const imgPartial = this.state.coverImgFile
        ? this.state.coverImg
        : this.parseImg(this.state.coverImg);
      return this.state.coverImg ? (
        <React.Fragment>
          <ModalBadge
            badgeContent={
              <Box>
                <Input
                  type="file"
                  style={styles.hide}
                  id="edit-icon-badge-file"
                  onChange={this.handleImageSelect}
                />
                <label htmlFor="edit-icon-badge-file">
                  <Button
                    component="span"
                    aria-label="edit upload picture"
                    disableRipple={true}
                    style={styles.badgeButton}
                  >
                    <Typography noWrap={true} style={styles.badgeTypography}>
                      Change cover image
                    </Typography>
                  </Button>
                </label>
              </Box>
            }
          >
            <Card variant="outlined" style={styles.badgeCardRoot}>
              <CardMedia
                component="img"
                image={imgPartial}
                src={this.state.coverImg}
                alt="cover-images"
              />
            </Card>
          </ModalBadge>
          {/* <FormControl
            fullWidth
            error={Boolean(this.state.coverImgError)}
            style={styles.modalFormControl}
          // variant="outlined"
          >
            {this.state.coverImgError && (
              <FormHelperText
                id="my-helper-text"
                style={styles.modalFormHelperImage}
              >
                {this.state.coverImgError}
              </FormHelperText>
            )}
          </FormControl> */}
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Box component="div" style={styles.uploadImage}>
            <Input
              type="file"
              style={styles.hide}
              id="icon-button-file"
              onChange={this.handleImageSelect}
            />
            <label htmlFor="icon-button-file">
              <IconButton aria-label="upload picture" component="span">
                <CloudUploadOutlined />
              </IconButton>
            </label>
            <Typography variant="overline">UPLOAD COVER IMAGE</Typography>
          </Box>
          {/* <FormControl
            fullWidth
            error={Boolean(this.state.coverImgError)}
            style={styles.modalFormControl}
          // variant="outlined"
          >
            {this.state.coverImgError && (
              <FormHelperText
                id="my-helper-text"
                style={styles.modalFormHelperImage}
              >
                {this.state.coverImgError}
              </FormHelperText>
            )}
          </FormControl> */}
        </React.Fragment>
      );
    };

    const LoadingState: any = () => {
      const result =
        this.state.loading &&
        Array(9)
          .fill(null)
          .map((item: null, int: number) => {
            return (
              <React.Fragment key={int}>
                <Grid item sm={12} md={6} lg={4}>
                  <Box style={styles.loadingRoot}>
                    <Skeleton animation="wave" variant="rect" width="100%">
                      <div style={styles.skeletonStart} />
                    </Skeleton>

                    <Skeleton
                      animation="wave"
                      height={10}
                      width="80%"
                      style={styles.loadingGutter}
                    />
                    <Skeleton
                      animation="wave"
                      height={10}
                      width="60%"
                      style={styles.loadingGutter}
                    />
                    <Skeleton
                      animation="wave"
                      height={10}
                      width="80%"
                      style={styles.loadingGutter}
                    />
                    <Skeleton
                      animation="wave"
                      height={10}
                      width="60%"
                      style={styles.loadingGutter}
                    />
                  </Box>
                  <Skeleton animation="wave" variant="rect" width="100%">
                    <div style={styles.skeletonEnd} />
                  </Skeleton>
                </Grid>
              </React.Fragment>
            );
          });

      const circular = (
        <React.Fragment>
          <Grid item sm={12} md={12} lg={12}>
            <Box style={styles.circularRoot}>
              <CircularProgress size={50} style={styles.progressCircle} />
            </Box>
          </Grid>
        </React.Fragment>
      );

      return circular;
    };

    return (
      // Customizable Area Start
      <ThemeProvider theme={theme}>
        <Grid container justifyContent="space-between" style={styles.mainGrid}>
          <Grid item>
            <Grid item>
              <Box style={styles.alignRoot}>
                <Box style={styles.secondaryGrid}>
                  {/* <Box style={styles.secondaryGrid} /> */}
                </Box>
                <Box style={styles.rootContainer}>
                  <Grid container spacing={2} style={styles.gridMore}>
                    <Grid item xs={12}>
                      <Grid
                        container
                        justifyContent="space-between"
                        alignItems="center"
                        spacing={2}
                        style={styles.gridMargin}
                      >
                        <Grid item style={styles.gridLess}>
                          <Typography variant="h6" style={styles.titleText}>
                            {this.workspaceTitleText}
                          </Typography>
                        </Grid>
                        <Grid item style={styles.gridLess}>
                          <Button
                            variant="contained"
                            disableElevation
                            onClick={this.handleModal}
                            size="large"
                            style={styles.titleButtonStyle}
                          >
                            {this.workspaceTitleButtonText}
                          </Button>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12}>
                      <Grid container justifyContent="space-between" spacing={3}>
                        {this.state.loading ? (
                          <LoadingState />
                        ) : (
                          <Grid container spacing={3}>
                            {loadWorkspace}
                          </Grid>
                        )}
                      </Grid>
                    </Grid>
                    <Grid item xs={12}>
                      <Grid container justifyContent="space-between" spacing={2}>
                        <Grid item>
                          <Modal
                            open={this.state.open}
                            onClose={this.handleButtonCancel}
                            aria-labelledby="modal-workspace-title"
                            aria-describedby="modal-workspace-description"
                            style={styles.modalRoot}
                            disableScrollLock={true}
                            BackdropProps={{
                              style: styles.modalBackdropProps,
                            }}
                          >
                            <Card variant="outlined" style={styles.modalCardRoot}>
                              <CardHeader
                              className="fdkf"
                                style={styles.modalCardHeader}
                                disableTypography={true}
                                action={
                                  <IconButton
                                    aria-label="close"
                                    onClick={this.handleButtonCancel}
                                  >
                                    <Close />
                                  </IconButton>
                                }
                                title={
                                  <Typography style={styles.modalCardHeaderText}>
                                    {this.state.edit
                                      ? this.modalEditTitle
                                      : this.modalAddTitle}
                                  </Typography>
                                }
                              />
                              <CardContent style={styles.modalCardContent}>
                                <BadgeFragment />

                                <Box component="form">
                                  <Typography
                                    variant="subtitle2"
                                    style={styles.formTypography}
                                  >
                                    Workspace Name
                                  </Typography>
                                  <FormControl
                                    fullWidth
                                    error={Boolean(this.state.titleError)}
                                    style={styles.modalFormControl}
                                  // variant="outlined"
                                  >
                                    <InputLabel htmlFor="my-input" />
                                    <input
                                      style={{
                                        width:"100%",
                                        padding:"12px  20px",
                                        margin:"8px 0px",
                                        fontFamily: "sans-serif"
  
                                  }}
                                      type="textarea"
                                      placeholder="Title goes here"
                                      value={this.state.title}
                                      onChange={this.handleTitleChange}
                                    />
                                    {this.state.titleError && (
                                      <FormHelperText
                                        id="my-helper-text"
                                        style={styles.modalFormHelper}
                                      >
                                        {this.state.titleError}
                                      </FormHelperText>
                                    )}
                                  </FormControl>
                                </Box>
                                <Box component="form">
                                  <Typography
                                    variant="subtitle2"
                                    style={styles.formTypography}
                                  >
                                    Description
                                  </Typography>
                                  <FormControl
                                    fullWidth
                                    error={Boolean(this.state.descriptionError)}
                                    style={styles.modalFormControl}
                                  // variant="outlined"
                                  >
                                    <InputLabel htmlFor="my-input" />
                                    <textarea
                                      // style={
                                      //   Boolean(this.state.descriptionError)
                                      //     ? styles.modalTextAreaError
                                      //     : styles.modalTextArea
                                      // }
                                      rows={4}
                                      placeholder="Type here"
                                      value={this.state.description}
                                      onChange={this.handleDescription}
                                      style={{fontFamily: "sans-serif"}}
                                    />
                                    {this.state.descriptionError && (
                                      <FormHelperText
                                        id="my-helper-text"
                                        style={styles.modalFormHelper}
                                      >
                                        {this.state.descriptionError}
                                      </FormHelperText>
                                    )}
                                  </FormControl>
                                </Box>
                                <Box component="form">
                                  <Typography
                                    variant="subtitle2"
                                    style={styles.formTypography}
                                  >
                                    Workspace admin
                                  </Typography>

                                  <FormControl
                                    fullWidth
                                    error={Boolean(this.state.adminStringError)}
                                    style={{
                                      ...styles.modalFormControl,
                                      ...styles.gutter,
                                    }}
                                  >
                                    <InputLabel htmlFor="my-input" />
                                    <input
                                      autoFocus={false}
                                      autoComplete={"off"}
                                      autoCorrect={"false"}
                                      autoCapitalize={"false"}
                                      style={{
                                        width:"100%",
                                        padding:"12px  20px",
                                        margin:"8px 0px",
                                        fontFamily: "sans-serif"
  
                                  }}
                                      minLength={5}
                                      multiple
                                      placeholder="Search user"
                                      value={this.state.searchValue}
                                      onChange={this.handleSearch}
                                      name="searchValue"
                                    />
                                    {this.state.adminStringError && (
                                    <FormHelperText
                                      id="my-helper-text"
                                      style={styles.modalFormHelper}
                                    >{this.state.adminStringError}</FormHelperText>
                                    )}
                                  </FormControl>
                                  <>
                                    {resultsFilter}
                                    {adminFilter}
                                  </>
                                </Box>
                              </CardContent>
                              <CardActions style={styles.modalCardActions}>
                                <Box style={styles.modalCardActionsContainer}>
                                  <Button
                                    disableElevation
                                    variant="contained"
                                    style={styles.modalCardCancelButton}
                                    onClick={this.handleButtonCancel}
                                  >
                                    {this.cancelButtonText}
                                  </Button>
                                  <Button
                                    disableElevation
                                    variant="contained"
                                    style={styles.modalCardActionButton}
                                    onClick={this.handleButtonAction}
                                  >
                                    {this.state.edit
                                      ? this.actionButtonSaveText
                                      : this.actionButtonAddText}
                                  </Button>
                                </Box>
                              </CardActions>
                            </Card>
                          </Modal>
                        </Grid>
                        <Grid item>
                          <Modal
                            open={Boolean(this.state.modalSuccessAlert)}
                            onClose={this.handleButtonCancel}
                            aria-labelledby="modal-workspace-success"
                            aria-describedby="modal-workspace-successModal"
                            style={styles.secondaryModalRoot}
                            disableScrollLock={true}
                            BackdropProps={{
                              style: styles.modalBackdropProps,
                            }}
                          >
                            <Card
                              variant="outlined"
                              style={styles.modalCardRootSuccess}
                            >
                              <CardContent style={styles.secondaryModalCardContent}>
                                <Container
                                  style={styles.secondaryModalContentContainer}
                                >
                                  <Box style={styles.modalImageBox}>
                                    <img
                                      src={modalImage}
                                      style={styles.modalImage}
                                    />
                                  </Box>
                                  <Box style={styles.modalSucessTextContainer}>
                                    <Typography align="center" style={styles.descriptionText}>
                                      {this.modalBreakpoint(this.state.modalSuccessAlert)}
                                    </Typography>
                                    <Button
                                      fullWidth
                                      style={styles.modalCardCancelButtonSuccess}
                                      onClick={this.handleButtonCancel}
                                    >
                                      <strong>OK</strong>
                                    </Button>
                                  </Box>
                                </Container>
                              </CardContent>
                            </Card>
                          </Modal>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} style={styles.alert}>
              {Boolean(this.state.alertMsg) && (
                <Box>
                  <Alert
                    severity={this.state.alertSeverity}
                    onClose={() => {
                      this.setState({ alertMsg: "" });
                    }}
                  >
                    <strong> {this.state.alertMsg} </strong>
                  </Alert>
                </Box>
              )}
            </Grid>
          </Grid>
        </Grid>
      </ThemeProvider>
      // Customizable Area End
    );
  }
}

// Customizable Area Start

const styles = {
  gridMargin: { marginBlockEnd: "0" },
  gridLess: { paddingInline: 0 },
  gridMore: { paddingInline: '1rem', height: '85vh', overflow: "scroll" },
  uploadImage: {
    padding: "5rem",
    border: "2px dashed rgba(155, 155, 155, .2)",
    borderRadius: "5px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  filterContainer: {
    // height: "5rem",
    paddingBlock: ".5rem",
    overflow: "scroll",
  },
  formTypography: {
    paddingBlockEnd: 1,
    fontSize: "16px",
    fontWeight: 600,
    color: "#5f5f5f",
  },
  modalCardCancelButton: {
    backgroundColor: "rgba(230, 230, 230, 1)",
    borderRadius: "4px",
    textTransform: "none",
    width: "100px",
    fontWeight: 500,
  } as React.CSSProperties,
  modalCardCancelButtonSuccess: {
    backgroundColor: "rgba(230, 230, 230, 1)",
    borderRadius: "4px",
    textTransform: "none",
    fontWeight: 500,
  } as React.CSSProperties,
  modalCardActionButton: {
    backgroundColor: "#42a5f5",
    color: "white",
    borderRadius: "4px",
    width: "100px",
    textTransform: "none",
  } as React.CSSProperties,
  modalCardActionsContainer: { display: "flex", gap: "0.5rem" },
  modalCardActions: {
    borderTop: "1px solid #ccc",
    display: "flex",
    justifyContent: "flex-end",
    paddingInline: "1rem",
  },
  modalCardContent: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    padding: "1rem",
    fontSize: "16px",
  } as React.CSSProperties,

  modalCardHeader: {
    borderBottom: "1px solid #ccc",
    paddingInline: "1rem",
  },
  modalCardHeaderText: {
    fontWeight: 600,
  },
  modalCardRoot: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 500,
    height: "90%",
    fontSize: "16px",
    overflowY: "scroll",
  } as React.CSSProperties,
  modalBackdropProps: {
    backgroundColor: "rgba(0, 0, 0, .7)",
    backdropFilter: "blur(10px)",
  },
  titleText: { fontSize: "medium", fontWeight: 600, textAlign: "center" } as React.CSSProperties,
  titleButtonStyle: {
    textTransform: "none",
    backgroundColor: "#42a5f5",
    color: "white",
  } as React.CSSProperties,
  alignRoot: { display: "grid", gridTemplateColumns: "15vw minmax(85vw, auto)" } as React.CSSProperties,
  secondaryGrid: {
    border: "none",
    gap: "1rem",
  },
  rootContainer: {
    display: "flex",
    flexDirection: "column",
    padding: "1rem",
    gap: "1rem",
  } as React.CSSProperties,
  mainGrid: {
    flexGrow: 1,
    backgroundColor: "rgba(200, 200, 200, .5)",
    zIndex: -1,
  },
  root: {
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    padding: "1rem", //
    height: 450,
  },
  modalRoot: {
    display: "flex",
    gap: 1,
    fontSize: "16px",
    justifyContent: "center",
    borderBlockStart: "1px solid #ccc",
    paddingBlock: "2rem", //
    backdropFilter: "blur(5px)",
    overflow: "scroll",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: "center",
  },
  cardActions: {
    display: "flex",
    gap: 1,
    alignItems: "center",
    justifyContent: "center",
    borderBlockStart: "1px solid #ccc",
    minHeight: "60px",
  },
  alert: {
    display: "flex",
    position: "fixed",
    top: 80,
    right: 1,
    zIndex: 4000,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  } as React.CSSProperties,
  gutter: {
    marginBlockEnd: "0.4rem",
  },

  loadingRoot: {
    display: "flex",
    flexDirection: "column",
  } as React.CSSProperties,
  loadingGutter: {
    marginBlockEnd: 4,
  },
  skeletonStart: { paddingTop: "40%", marginBlockEnd: 6 },
  skeletonEnd: { paddingTop: "10%", marginBlockStart: 6 },
  circularRoot: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  progressCircle: {
    color: "#6e6e6e",
  },
  badgeButton: {
    borderRadius: "6px",
    textTransform: "none",
    backgroundColor: "rgba(222, 227, 230, 1)",
  } as React.CSSProperties,
  badgeTypography: {
    paddingBlock: ".2rem",
    paddingInline: ".3rem",
  },

  badgeCardRoot: {
    height: "200px",
    width: "100%",
  },

  workspaceAvatar: { width: 32, height: 32 },
  workspaceCardRoot: {
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    textAlign: "center",
    padding: "1rem",
    height: 450,
  } as React.CSSProperties,
  workspaceIconButton: { padding: "1rem" },
  workspaceStyledCard: { height: "175px", width: "476" },
  workspaceId: {
    fontSize: "small",
  },
  workspaceName: { fontWeight: 600, fontSize: "medium" },
  descriptionContainer: {
    height: "100px",
    overflow: "scroll",
  },

  formRoot: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    border: "1px solid rgba(155, 155, 155, .5)",
    gap: "0.1rem",
    borderRadius: "4px",
    paddingInline: "8px",
    paddingBlock: "0.2rem",
    color: "rgba(155, 155, 155, 1)",
  },
  formActivePick: { backgroundColor: "#42a5f5", color: "#fff" },
  formAvatar: { width: 32, height: 32, backgroundColor: "#5f5f5f" },
  formTextContainer: { cursor: "pointer" },
  formToolTypography: {
    display: "flex",
    flexWrap: "nowrap",
    fontSize: "small",
  } as React.CSSProperties,

  hide: {
    display: "none",
  },
  secondaryModalRoot: {
    display: "flex",
    gap: 1,
    fontSize: "16px",
    justifyContent: "center",
    borderBlockStart: "1px solid #ccc",
    backdropFilter: "blur(5px)",
    overflow: "scroll",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: "center",
  },
  modalCardRootSuccess: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 300,
    height: "37%",
    maxHeight: 300,
    fontSize: "16px",
    overflow: "scroll",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    borderRadius: "0",
  } as React.CSSProperties,
  secondaryModalCardContent: {
    padding: 0,
  },

  secondaryModalContentContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    fontSize: "16px",
    alignItems: "center",
  } as React.CSSProperties,

  modalImageBox: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  modalImage: {
    width: "200px",
    height: "100px",
    aspectRatio: "1/1",
    marginBlockEnd: "25px",
  },
  modalSucessTextContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    fontSize: "16px",
  } as React.CSSProperties,
  descriptionText: {
    fontSize: "16px",
  },
  modalFormControl: {
    // border: "none",
    // textDecorationColor: "purple",
    // textDecoration: "none",
  } as React.CSSProperties,
  modalTextField: {
    borderRadius: "4px",
    paddingBlock: "18px",
    paddingInline: "14.5px",
    fontSize: "16px",
    border: "1px solid rgba(0, 0, 0, .3)",
  },
  modalTextArea: {
    paddingBlock: "18px",
    paddingInline: "14.5px",
    boxSizing: "border-box",
    border: "1px solid rgba(0, 0, 0, .3)",
    borderRadius: "4px",
    fontSize: "16px",
    resize: "none",
    fontFamily: "sans-serif",
  } as React.CSSProperties,

  modalTextAreaError: {
    paddingBlock: "18px",
    paddingInline: "14.5px",
    boxSizing: "border-box",
    borderRadius: "4px",
    fontSize: "16px",
    resize: "none",
    fontFamily: "sans-serif",
    backgroundColor: "#fdf5f5",
    border: "1px solid red",
  } as React.CSSProperties,

  modalTextFieldError: {
    borderRadius: "4px",
    paddingBlock: "18px",
    paddingInline: "14.5px",
    fontSize: "16px",
    backgroundColor: "#fdf5f5",
    border: "1px solid red",
  },
  modalFormHelper: {
    paddingBlock: "0",
    paddingInline: "0",
  },
  modalFormHelperImage: {
    alignSelf: "center",
    paddingBlock: "0",
    paddingInline: "0",
  },
  excessIcon: {
    color: "white"
  }
};

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: "5%",
    top: "10%",
    borderRadius: "2px",
    backgroundColor: "white",
    width: "25px",
    height: "20px",
    padding: ".8rem",
  },
}));

const ModalBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: "26%",
    top: "16%",
    borderRadius: "4px",
    // backgroundColor: "rgba(255, 255, 255, .6)",
    height: "20px",
    padding: "0.8rem",
  },
}));

// Customizable Area End

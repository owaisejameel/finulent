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
  Menu,
  MenuItem,
  TextField,
  Tooltip,
  FormControl,
  FormHelperText,
  CircularProgress,
  Link,
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
import {
  Close,
  CloudUploadOutlined,
  MoreHorizOutlined,
  MoreHoriz,
  MoreVert,
} from "@material-ui/icons";
import SearchBar from "material-ui-search-bar";
import { modalImage } from "./assets";

const theme = createTheme({
  typography: {
    fontFamily: "sans-serif",
    fontSize: 16,
  },
});

// Customizable Area End

import ClientManagementSubFoldersController, {
  Props,
} from "./ClientManagementSubFoldersController";

export default class ClientManagementSubFolders extends ClientManagementSubFoldersController {
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
      return { open: !prev.open }
    }, () => {
      this.getAdminData();
    });
  };

  handleWorkspaceEdit = (id: string) => {
    this.state.workspaces.map((workspace: any) => {
      if (workspace.id === id) {
        const adminString = workspace.attributes.team_leaders.data
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
              title: workspace.attributes.team_title,
              description: workspace.attributes.description,
              coverImg: workspace.attributes.image,
              admins: workspace.attributes.team_leaders.data,
              adminString,
              folder_id: workspace.id
            };
          },
          () => {
            this.getAdminData();
          }
        );
        return workspace;
      }
      return undefined;
    });
  };

  handleDescription = (event: any) => {
    const value = event.target.value;
    if (value.length < 300) {
      this.setState((prev) => {
        return { ...prev, description: value, descriptionError: "" };
      });
      return;
    }

    this.triggerWarning(true, this.descriptionWarning);
    return;
  };

  handleTitleChange = (event: any) => {
    const value = event.target.value;
    this.setState({ title: value, inputError: "" });
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

  handleSearch = (event: string) => {
    this.setState(
      {
        searchValue: event,
        loading: false,
      },
      () => {
        if (!event) {
          this.requestSearch();
        }
      }
    );
    return;
  };

  handleAdminSearch = (event: any) => {
    const value = event.target.value;
    this.setState({ adminSearchValue: value, adminStringError: "" }, () => {
    });
  };

  renderAdmins() {
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

  handleFormChange = (
    event: React.ChangeEvent<{ name: string; value: unknown }>
  ) => {
    const name: string = event.target.name;
    const value: any = event.target.value;
    const error: string = name.concat("Error")
    if (!this.state) return;

    if (name === "description") {
      if (value.length < 300) {
        this.setState((prev) => {
          return { ...prev, description: value, descriptionError: "" };
        });
        return;
      }
      return;
    }

    this.setState((prev) => {
      return { ...prev, [name]: value, [error]: "" };
    });
  };

  handleDeleteModalOpen = () => {
    this.setState({ open: true, deleteModal: true, menuOpen: false, modalAlertMsg: "" }, () => {
    });
  };

  requestSearch = () => {
    this.setState(
      {
        loading: true,
      },
      () => {
        this.searchSubFolderData();
      }
    );
  };

  cancelSearch = () => {
    console.log("cancel calling")
    this.setState(
      {
        searchValue: "",
        alertMsg: "",
      },
      () => {
        this.getWorkspaceData();
      }
    );
  };

  handleTemplateDetailClick = (workspace: any) => {
    const { attributes, id: sfId } = workspace;
    const { client_management, template_completed } = attributes;
    if (template_completed && attributes?.template?.id) {
      this.props.history.push(`/reviewChecklist?cid=${client_management?.id}&sfid=${sfId}&tid=${attributes?.template?.id}`)
    }
    else {
      this.props.history.push(
        `/template?cid=${client_management.id}&sfid=${sfId}`
      )
    }
  }

  modalBreakpoint(payload: string) {
    if (!payload) return
    const keyword = "Successfully"
    const [first, _] = payload.split(keyword)
    return <>
      {first}<br />{keyword}!
    </>
  }

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
    return <React.Fragment>{results}</React.Fragment>;
  }

  FilterResults() {
    const row: any = this.state.availableTL;
    const secondrow: any = this.state.unavailableTL;
    const searches = row.filter((user: any) => {
      const name = user.attributes.first_name
        ? `${user.attributes.first_name} ${user.attributes.last_name}`
        : "default";
      return name.trim().toLowerCase().includes(this.state.adminSearchValue)
    })
    const unavailsearches = secondrow.filter((unavailuser: any) => {
      const unavailnames = unavailuser.attributes.first_name ? `${unavailuser.attributes.first_name} ${unavailuser.attributes.last_name}`: "default";
      return unavailnames.trim().toLowerCase().includes(this.state.adminSearchValue)
    })

    return (
      this.state.adminSearchValue.trim().length && (searches.length || unavailsearches.length) ? (
        <React.Fragment>
          <Box style={styles.filterContainer}>
            <Grid container spacing={1}>
              {this.FormRow(searches)}
            </Grid>
          </Box>
          <Box style={styles.filterContainerdisable}>
          <Grid container spacing={1}>
            {this.FormRow(unavailsearches)}
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
        const avatars = workspace.attributes.team_leaders.data.map(
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
        const altPartial = workspace.attributes.name
          ? workspace.attributes.name.toLowerCase()
          : null;
        return (
          <React.Fragment key={workspace.id}>
            <Grid item sm={12} md={6} lg={3}>
              <Card style={styles.workspaceCardRoot} variant="outlined">
                <StyledBadge
                  badgeContent={
                    <IconButton
                      disableRipple={true}
                      onClick={(e) => {
                        this.handleWorkspaceEdit(workspace.id)
                        this.setState(
                          { anchorEl: e.currentTarget },
                          () => {
                            this.setState({
                              menuOpen: Boolean(
                                this.state.anchorEl
                              ),
                            });
                          }
                        );
                        return
                      }}
                      aria-label="edit-icon"
                      style={styles.workspaceIconButton}
                    >
                      <MoreHorizOutlined />
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
                    {workspace.attributes.team_title}
                  </Typography>

                  <Container style={styles.descriptionContainer}>
                    <Typography variant="body2" color="textSecondary">
                      {workspace.attributes.description}
                    </Typography>
                  </Container>
                </CardContent>

                <CardActions style={styles.cardActions}>
                  <Typography variant="body2" color="textSecondary">
                    Team Leader
                  </Typography>
                  <AvatarGroup max={5}>{avatars}</AvatarGroup>
                </CardActions>

                <CardActions style={styles.cardActions} onClick={() =>  this.handleTemplateDetailClick(workspace)}>
                  <Typography
                    color="textSecondary"
                    style={styles.cardActionsActionText}
                  >
                    {this.templateText}
                  </Typography>
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
    const resultsFilter = Boolean(this.state.availableTL.length) && this.FilterResults();
    const adminFilter =
      Boolean(this.state.admins.length) && this.AdminResults();
    const loadWorkspace = this.WorkSpace();

    const BadgeFragment: FunctionComponent = () => {
      const imgPartial = this.state.coverImgFile
        ? this.state.coverImg
        : this.parseImg(this.state.coverImg);
      return this.state.coverImg ? (
        <React.Fragment>
          <ModalBadge
            badgeContent={
              <>
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
                <FormControl
                  fullWidth
                  style={styles.modalFormControl}
                  error={Boolean(this.state.coverImgError)}
                >
                  <FormHelperText
                    id="my-helper-text"
                    style={styles.modalFormHelperImage}
                  >
                    {this.state.coverImgError}
                  </FormHelperText>
                </FormControl>
              </>
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
        </React.Fragment>
      ) : (
        <>
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
          <FormControl
            fullWidth
            style={styles.modalFormControl}
            error={Boolean(this.state.coverImgError)}
          >
            <FormHelperText
              id="my-helper-text"
              style={styles.modalFormHelperImage}
            >
              {this.state.coverImgError}
            </FormHelperText>
          </FormControl>
        </>
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
          <Grid item style={styles.mainitemGrid}>
            <Grid item>
              <Box style={styles.alignRoot}>
                <Box style={styles.secondaryGrid} />
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

                          {this.state.clientName && <Typography variant="h6" style={styles.subtitleText}>
                            <Link href={"/client"} style={styles.gobacklink}>{this.state.clientName}</Link>
                            {this.workspaceSubTitleText}
                          </Typography>}
                        </Grid>
                        <Grid item style={styles.gridLess}>
                          <Grid
                            item
                            container
                            justifyContent="center"
                            alignItems="center"
                            spacing={3}
                          >
                            <Grid item>
                              <SearchBar
                                placeholder="Search Sub Folder"
                                value={this.state.searchValue}
                                onChange={this.handleSearch}
                                onCancelSearch={() => console.log("Cancel ")}
                                onRequestSearch={this.requestSearch}
                              />
                            </Grid>
                            <Grid item>
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
                      </Grid>
                    </Grid>
                    <Grid item xs={12}>
                      <Grid container justifyContent="space-between" spacing={3}>
                        {this.state.loading ? (
                          <LoadingState />
                        ) : (
                          <Grid container spacing={1}>
                            {loadWorkspace}
                            <Menu
                              elevation={1}
                              anchorEl={this.state.anchorEl}
                              open={this.state.menuOpen}
                              onClose={() => {
                                this.setState({
                                  menuOpen: false,
                                  anchorEl: null,
                                },
                                  () => {
                                    this.handleButtonCancel();
                                  }
                                );
                              }}
                            >
                              <MenuItem
                                onClick={() =>
                                  this.setState({ menuOpen: false },
                                    () => {
                                      this.handleModal();
                                    }
                                  )
                                }
                              >
                                Edit
                              </MenuItem>
                              <MenuItem
                                onClick={this.handleDeleteModalOpen}
                              >
                                Delete
                              </MenuItem>
                            </Menu>
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
                            <Card variant="outlined" style={this.state.deleteModal ? styles.modalCardRootDelete : styles.modalCardRoot}>
                              <CardHeader
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
                                  <Typography>
                                    {!this.state.deleteModal && <strong>
                                      {this.state.edit
                                        ? this.modalEditTitle
                                        : this.modalAddTitle}
                                    </strong>}
                                    {this.state.deleteModal && <strong>
                                      {this.modalDeleteTitle}
                                    </strong>}

                                  </Typography>
                                }
                              />
                              {!this.state.deleteModal && (<>
                                <CardContent style={styles.modalCardContent}>
                                  <BadgeFragment />
                                  <Box component="form">
                                    <Typography
                                      variant="subtitle2"
                                      style={
                                        styles.modalCardContentEditModalTypography
                                      }
                                    >
                                      Workspace Name
                                    </Typography>
                                    <FormControl
                                      fullWidth
                                      style={styles.modalFormControl}
                                    >
                                      <InputLabel htmlFor="my-input" />
                                      <input
                                        disabled
                                        style={{ ...styles.modalTextField, ...styles.modalCardContentEditModalID }}
                                        placeholder="Type Name here"
                                        value={this.state.workspaceTitle}
                                        name="workspaceTitle"
                                        onChange={this.handleFormChange}
                                      />

                                      <FormHelperText
                                        id="my-helper-text"
                                        style={styles.modalFormHelper}
                                      >
                                      </FormHelperText>

                                    </FormControl>
                                  </Box>

                                  <Box component="form">
                                    <Typography
                                      variant="subtitle2"
                                      style={
                                        styles.modalCardContentEditModalTypography
                                      }
                                    >
                                      Client Name
                                    </Typography>
                                    <FormControl
                                      fullWidth
                                      style={styles.modalFormControl}
                                    >
                                      <InputLabel htmlFor="my-input" />
                                      <input
                                        disabled
                                        style={{ ...styles.modalTextField, ...styles.modalCardContentEditModalID }}
                                        placeholder="Type Name here"
                                        value={this.state.clientName}
                                        name="clientName"
                                        onChange={this.handleFormChange}
                                      />

                                      <FormHelperText
                                        id="my-helper-text"
                                        style={styles.modalFormHelper}
                                      >
                                      </FormHelperText>

                                    </FormControl>
                                  </Box>
                                  <Box
                                    component="form"
                                    style={styles.modalCardSplitContentContainer}
                                  >
                                    <Box>

                                      <Typography
                                        variant="subtitle2"
                                        style={
                                          styles.modalCardContentEditModalTypography
                                        }
                                      >
                                        Client id
                                      </Typography>
                                      <FormControl
                                        fullWidth
                                        style={styles.modalFormControl}
                                      >
                                        <InputLabel htmlFor="my-input" />
                                        <input
                                          disabled
                                          style={{ ...styles.modalTextField, ...styles.modalCardContentEditModalID }}
                                          placeholder="Type Name here"
                                          value={`${this.state.clientID}`}
                                          name="clientid"
                                          onChange={this.handleFormChange}
                                        />

                                        <FormHelperText
                                          id="my-helper-text"
                                          style={styles.modalFormHelper}
                                        >
                                        </FormHelperText>
                                      </FormControl>

                                    </Box>
                                    <Box>
                                      <Typography
                                        variant="subtitle2"
                                        style={
                                          styles.modalCardContentEditModalTypography
                                        }
                                      >
                                        Team title
                                      </Typography>

                                      <FormControl
                                        error={Boolean(this.state.titleError)}
                                        fullWidth
                                        style={styles.modalFormControl}
                                      >
                                        <InputLabel htmlFor="my-input" />
                                        <input
                                          style={Boolean(this.state.titleError) ? styles.modalTextFieldError : styles.modalTextField}
                                          placeholder="Type title here"
                                          value={this.state.title}
                                          name="title"
                                          onChange={this.handleFormChange}
                                        />
                                        <FormHelperText
                                          id="my-helper-text"
                                          style={styles.modalFormHelper}
                                        >
                                          {this.state.titleError}
                                        </FormHelperText>
                                      </FormControl>
                                    </Box>
                                  </Box>

                                  <Box component="form">
                                    <Typography
                                      variant="subtitle2"
                                      style={
                                        styles.modalCardContentEditModalTypography
                                      }
                                    >
                                      Description
                                    </Typography>
                                    <FormControl
                                      fullWidth
                                      style={styles.modalFormControl}
                                      error={Boolean(this.state.descriptionError)}
                                    >
                                      <InputLabel htmlFor="my-input" />
                                      <textarea
                                        style={Boolean(this.state.descriptionError) ? styles.modalTextAreaError : styles.modalTextArea}
                                        rows={4}
                                        placeholder="Type here"
                                        value={this.state.description}
                                        onChange={this.handleFormChange}
                                        name="description"
                                      />

                                      <FormHelperText
                                        id="my-helper-text"
                                        style={styles.modalFormHelper}
                                      >
                                        {this.state.descriptionError}
                                      </FormHelperText>
                                    </FormControl>
                                  </Box>
                                  <Box component="form">
                                    <Typography
                                      variant="subtitle2"
                                      style={styles.formTypography}
                                    >
                                      Team Leader
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
                                        style={
                                          Boolean(this.state.adminStringError)
                                            ? styles.modalTextFieldError
                                            : styles.modalTextField
                                        }
                                        minLength={5}
                                        multiple
                                        placeholder="Search user"
                                        value={this.state.adminSearchValue}
                                        onChange={this.handleAdminSearch}
                                        name="adminSearchValue"
                                      />
                                      <FormHelperText
                                        id="my-helper-text"
                                        style={styles.modalFormHelper}
                                      >{this.state.adminStringError}</FormHelperText>
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
                              </>)}
                              {this.state.deleteModal && (
                                <>
                                  <CardContent
                                    style={styles.modalCardContentDelete}
                                  >
                                    <Box component="div">
                                      <Typography
                                        variant="subtitle2"
                                        style={
                                          styles.modalCardContentDeleteContainer
                                        }
                                      >
                                        <Typography align="left">Are you sure, you want to delete{" "}</Typography>
                                        <Typography align="left">{this.state.title} subfolder?</Typography>
                                      </Typography>
                                    </Box>
                                  </CardContent>

                                  <CardActions style={styles.modalCardActions}>
                                    <Box style={styles.modalCardActionsContainer}>
                                      <Button
                                        disableElevation
                                        variant="contained"
                                        style={styles.modalDeleteCancelButton}
                                        onClick={this.handleButtonCancel}
                                      >
                                        <strong>{this.cancelButtonText}</strong>
                                      </Button>
                                      <Button
                                        disableElevation
                                        variant="contained"
                                        style={styles.modalDeleteCancelButton}
                                        onClick={() => {
                                          this.deleteFolder();
                                          this.handleButtonCancel();
                                        }}
                                      >
                                        <strong>Yes</strong>
                                      </Button>
                                    </Box>
                                  </CardActions>
                                </>
                              )}
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
                                      style={styles.modalCardCancelButton}
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
                <p style={{fontFamily: "sans-serif"}}>{this.state.alertMsg}</p>
              )}
            </Grid>
          </Grid>
        </Grid>
      </ThemeProvider>
      // Customizable Area End
    );
  }
}
1
// Customizable Area Start

const styles = {
  gridMargin: { marginBlockEnd: "0", backgroundcolor: "#eeeeee" },
  gridLess: { paddingInline: 0 },
  gridMore: { paddingInline: '1rem',backgroundcolor: "#eeeeee"  },
  uploadImage: {
    padding: "5rem",
    border: "2px dashed rgba(155, 155, 155, .2)",
    borderRadius: "5px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  filterContainer: {
    paddingBlockStart: "1rem",
    overflow: "scroll",
  },
  filterContainerdisable: {
    paddingBlockStart: "1rem",
    overflow: "scroll",
    backgroundColor: "#d3cfcf",
    color: "black",
  },
  formTypography: {
    paddingBlockEnd: 1,
    fontSize: "16px",
    fontWeight: 600,
    color: "#5f5f5f",
  },
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

  modalCardRootDelete: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    height: "30%",
    fontSize: "16px",
    marginBlockEnd: "1rem",
    overflow: "scroll",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  } as React.CSSProperties,

  modalBackdropProps: {
    backgroundColor: "rgba(0, 0, 0, .7)",
    backdropFilter: "blur(10px)",
  },
  titleText: { fontSize: "medium", fontWeight: 600 },
  subtitleText: { fontSize: "small", color: "#5f5f5f" },
  gobacklink: {color: "rgb(95, 95, 95)"},

  titleButtonStyle: {
    textTransform: "none",
    backgroundColor: "#42a5f5",
    color: "white",
  } as React.CSSProperties,
  rootContainer: {
    display: "flex",
    flexDirection: "column",
    padding: "1rem",
    gap: "1rem",
  } as React.CSSProperties,
  mainGrid: {
    flexGrow: 1,
    zIndex: -1,
  },
  mainitemGrid: {backgroundColor: "#e8e8e8"},
  alignRoot: { display: "grid", gridTemplateColumns: "15vw minmax(85vw, auto)" } as React.CSSProperties,
  secondaryGrid: {
    border: "none",
    gap: "1rem",
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

  modalCardSplitContentContainer: {
    display: "grid",
    gap: "1rem",
    gridTemplateColumns: "30% auto",
  } as React.CSSProperties,

  loadingRoot: {
    display: "flex",
    flexDirection: "column",
  } as React.CSSProperties,
  loadingGutter: {
    marginBlockEnd: 4,
  },
  skeletonStart: { paddingTop: "40%", marginBlockEnd: 6 },
  skeletonEnd: { paddingTop: "10%", marginBlockStart: 6 },

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
  cardActionsActionText: {
    color: "#42a5f5",
    fontSize: "18px",
    fontWeight: "bold",
    textDecoration: "none",
    cursor: "pointer",
  } as React.CSSProperties,
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
  workspaceIconButton: { backgroundColor: "none", color: "#000" },
  workspaceStyledCard: { height: "120px", width: "275px" },
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
  selectedModalContentField: {
    backgroundColor: "rgba(200, 200, 200, .4)",
  },
  modalCardContentEditModalTypography: {
    paddingBlockEnd: 1,
    fontSize: "16px",
    fontWeight: "bold",
    color: "#5f5f5f",
  } as React.CSSProperties,
  modalFormControl: {
  } as React.CSSProperties,
  modalFormHelper: {
    paddingBlock: "0",
    paddingInline: "0",
  },
  modalFormHelperImage: {
    alignSelf: "center"
  },
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
    fontSize: "16px",
    resize: "none",
    fontFamily: "sans-serif",
  } as React.CSSProperties,
  modalSelectField: {
  },

  modalSelectFieldError: {
    fontSize: "16px",
  },
  modalTextFieldError: {
    paddingBlock: "18px",
    fontSize: "16px",
  },
  modalCardContentEditModalID: {
    backgroundColor: "rgba(200, 200, 200, .4)"
  },

  modalCardContentDeleteContainer: {
    textAlign: "center",
    paddingBlock: "0rem",
    fontSize: "16px",
    color: "#5f5f5f",
  } as React.CSSProperties,
  modalCardContentDelete: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  } as React.CSSProperties,
  modalActionButton: {
    backgroundColor: "#42a5f5",
    color: "white",
    borderRadius: "4px",
    width: "120px",
    textTransform: "none",
  } as React.CSSProperties,
  modalCancelButton: {
    borderRadius: "4px",
    paddingBlock: ".5rem",
    width: "120px",
    textTransform: "none",
  } as React.CSSProperties,
  modalDeleteCancelButton: {
    borderRadius: "6px",
    paddingBlock: ".5rem",
    marginBlock: ".3rem",
    width: "120px",
    textTransform: "none",
    fontWeight: 600,
  } as React.CSSProperties,

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
    borderRadius: "0"
  } as React.CSSProperties,
  modalCardCancelButton: {
    backgroundColor: "rgba(230, 230, 230, 1)",
    borderRadius: "4px",
    textTransform: "none",
    fontWeight: 500,
    width: "100px",
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

  modalSucessTextContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    fontSize: "16px"
  } as React.CSSProperties,
  modalImage: {
    width: "200px",
    height: "100px",
    aspectRatio: "1/1",
    marginBlockEnd: "25px",
  },
  descriptionText: {
    fontSize: "16px",
  },
  circularRoot: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  progressCircle: {
    color: "#6e6e6e"
  },
  mainDiv: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    paddingTop: "30px",
    marginLeft: "60px"
  },
  invoiceTitle: {
    color: "#2c2c2c",
    fontFamily: "sans-serif",
    fontSize: "16px",
    fontWeight: "700",
  },
  excessIcon: {
    color: "white"
  }
};

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: "8%",
    top: "20%",
    borderRadius: "2px",
    width: "25px",
    height: "20px",
    padding: ".8rem",
    backgroundColor: "none",
  },
}));

const ModalBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: "26%",
    top: "16%",
    borderRadius: "4px",
    height: "20px",
    padding: "0.8rem",
  },
}));

// Customizable Area End

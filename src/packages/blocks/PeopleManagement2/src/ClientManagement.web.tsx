import React, { FunctionComponent } from "react";

import {
  Container,
  Box,
  Input,
  Button,
  InputLabel,
  Typography,
  IconButton,
  // Customizable Area Start
  Avatar,
  Badge,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Grid,
  Modal,
  FormControl,
  FormHelperText,
  Select,
  Link,
  Menu,
  MenuItem,
  ListItemText,
  Checkbox,
  Tooltip,
  CircularProgress,
  // Customizable Area End
} from "@material-ui/core";

// Customizable Area Start
import { AvatarGroup, Skeleton } from "@material-ui/lab";
import SearchBar from "material-ui-search-bar";

import {
  createTheme,
  ThemeProvider,
  styled,
} from "@material-ui/core/styles";
import {
  Close,
  MoreHoriz,
  CloudUploadOutlined,
} from "@material-ui/icons";

import { modalImage } from "./assets";

const theme = createTheme({
  palette: {
    primary: {
      main: "#6a6f7a",
    },
  },
  typography: {
    fontFamily: "sans-serif",
    fontSize: 16,
  },
});

// Customizable Area End

import ClientManagementController, {
  Props,
} from "./ClientManagementController";

export default class ClientManagement extends ClientManagementController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  handleNavigationLink(id: any) {
    sessionStorage.setItem("id", id)
  };

  handleButtonAction = () => {
    if (this.state.titleModal) {
      return this.saveWorkspace();
    }
    return this.addWorkspace();
  };

  handleButtonCancel = () => {
    this.resetWorkspace();
  };

  handleModal = () => {
    this.setState((prev) => {
      return {
        open: !prev.open,
        editModal: !prev.editModal,
        deleteModal: false,
      };
    });
  };

  handleImageSelect = (event: any) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        this.setState({ coverImg: reader.result, coverImgFile: file, coverImgError: "" });
      }
    };
    reader.readAsDataURL(file);
  };

  handleFormSelect = (event: any) => {
    const value: string = event.target["value"] === "none" ? "" : event.target["value"];
    this.setState((prev) => {
      return { ...prev, workspace_id: value, workspace_idError: "" };
    }, () => {
      this.getAdminData();
    });
  };

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

  handleContactFormChange = (
    event: React.ChangeEvent<{ name: string; value: unknown }>
  ) => {
    const value: any = event;
    this.setState((prev) => {return { ...prev, clientContact: value, clientContactError: "" }});
  };

  handleSelectChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const { options } = event.target as HTMLSelectElement;
    const { value } = event.target as HTMLSelectElement;

    if (options) {
      const value: string[] = [];
      for (let item of options) {
        if (item.selected) {
          value.push(item.value);
        }
      }
      this.setState({
        workspaceMultipleName: value,
      });
    }

    if (value.includes("all")) {
      this.setState(
        (prev) => {
          const workspaceMultipleName = prev.spaceCheck
            ? []
            : prev.workspaceItem;
          return {
            spaceCheck: !prev.spaceCheck,
            workspaceMultipleName,
          };
        },
        () => {this.state.spaceCheck && this.requestSearch()}
      );

      return;
    }

    this.setState((prev) => {
      const spaceCheck = prev.spaceCheck
        ? !prev.spaceCheck
        : value.length === prev.workspaceItem.length
          ? !prev.spaceCheck
          : prev.spaceCheck;
      return {
        workspaceMultipleName: value,
        spaceCheck,
      };
    });
  };

  handleDeleteModalOpen = () => {
    this.setState({ open: true, deleteModal: true, menuOpen: false, modalAlertMsg: "" });
  };

  handleEditModalOpen = () => {
    this.setState({ edit: false, deleteModal: false, editModal: true, titleModal: true });
  };

  nerfDescription = (data: string, searchbar: boolean) => {
    if (data) {
      const charLength = searchbar ? 21 : 15;
      if (data.length > 15) {
        return data.substring(0, charLength).concat("..");
      }

      if (searchbar && data.length > charLength) {
        return data.substring(0, charLength).concat("..");
      }
    }

    return data;
  };

  modalBreakpoint(payload: string) {
    if (!payload) return
    const keyword = "Successfully"
    const [first, _] = payload.split(keyword)
    return <>
      {first}<br />{keyword}!
    </>
  };

  handleClientWorkspaceEdit = (id: string) => {
    this.state.workspaces.map((client: any) => {
      if (client.id === id) {
        const adminString = client.attributes.team_leaders.data
          .map(
            (user: any) =>
              `${user.attributes.first_name} ${user.attributes.last_name}`
          )
          .join("; ");

        this.setState(
          (prev) => {
            return {
              ...prev,
              clientName: client.attributes.client_name,
              clientID: client.id,
              clientAddress: client.attributes.client_address,
              clientContact: client.attributes.contack_details,
              clientOfficialEmail: client.attributes.client_email,
              workspaceName: client.attributes.workspace.name,
              workspace_id: client.attributes.workspace.id,
              description: client.attributes.description,
              coverImg: client.attributes.image,
              teamLeaders: client.attributes.team_leaders.data,
              adminString,
            };
          });
        return client;
      }
      return undefined;
    });
  };

  handleDetails = (id: string) => {
    this.state.workspaces.map((client: any) => {
      if (client.id === id) {
        this.setState(
          (prev) => {
            return {
              clientName: client.attributes.client_name,
              clientID: client.id,
              clientAddress: client.attributes.client_address,
              clientContact: client.attributes.contack_details,
              clientOfficialEmail: client.attributes.client_email,
              workspaceName: client.attributes.workspace.name,
              workspace_id: client.attributes.workspace.id,
              description: client.attributes.description,
              coverImg: client.attributes.image,
              teamLeaders: client.attributes.team_leaders.data,
              open: true,
              edit: true,
              menuOpen: false,
            };
          },
          () => {
            this.getAdminData();
          }
        );
        return client;
      }
      return undefined;
    });
  };

  moreDetail = (e: React.ChangeEvent, id: string) => {
    const element: any = e.target
    if (element.id === "target-link" || element.id === "edit-icon") return
    if (element.nodeName === "path") return
    this.handleDetails(id)
  }

  resolveTitle() {
    if (this.state.editModal) {
      return this.state.titleModal ? this.modalEditTitle : this.modalAddTitle;
    } else {
      if (this.state.deleteModal) {
        return `Delete ${this.state.clientName} client?`;
      }
      if (this.state.edit) {
        return this.state.clientName;
      }
      return this.modalEditTitle;
    }
  }

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
  };

  handleAdminSearch = (event: any) => {
    const value = event.target.value;
    this.setState({ adminSearchValue: value, adminStringError: "" });
  };

  requestSearch = () => {
    this.setState(
      {
        loading: true,
      },
      () => {
        this.searchClientData();
      }
    );
  };

  cancelSearch = () => {
    this.setState(
      {
        searchValue: "",
        alertMsg: "",
      },
      () => {
        this.getClientData();
      }
    );
  };

  renderAdmins() {
    const admins = this.state.teamLeaders.map(
      (user: any) =>
        `${user.attributes.first_name} ${user.attributes.last_name}`
    );

    this.setState({ adminString: admins.join("; ") });
  }

  handleSearchItemClick(payload: any) {
    const data = this.state.teamLeaders.filter(
      (user: any) => user.id === payload.id
    ).length;
    if (data) return;
    this.setState(
      (prev) => {
        return {
          ...prev,
          teamLeaders: prev.teamLeaders.concat(payload),
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
        teamLeaders: this.state.teamLeaders.filter(
          (user: any) => String(user.id) !== id
        ),
      },
      () => {
        this.renderAdmins();
      }
    );
  }

  FormRow(row: any) {
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
              <Box style={{ ...styles.formContainer }}>
                <Avatar
                  style={styles.formAvatar}
                  alt={name}
                  src={imgPartial}
                  key={name}
                />
                <Box
                  component="span"
                  style={styles.formToolTipContainer}
                  onClick={() => this.handleSearchItemClick(user)}
                >
                  <Tooltip title={name} aria-label={`tooltip-${name}`}>
                    <Typography noWrap={true} style={styles.toolTipTypography}>
                      {this.nerfNames(name)}
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

  nerfNames = (data: string) => {
    if (data) {
      const charLength = 10;
      if (data.length > 8) {
        const processedString = data.substring(0, charLength).concat("..");
        return processedString.length <= 11 ? data : processedString;
      }
    }
    return data;
  };

  AdminRow(row: any) {
    const results =
      row &&
      row.map((user: any) => {
        const excessstyle = this.state.teamLeaders
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
              <Box style={{ ...styles.formContainer, ...excessstyle }}>
                <Avatar
                  style={styles.formAvatar}
                  alt={name}
                  src={imgPartial}
                  key={name}
                />
                <Box
                  component="span"
                  style={styles.formToolTipContainer}
                  onClick={() => this.handleSearchItemClick(user)}
                >
                  <Tooltip title={name} aria-label={`tooltip-${name}`}>
                    <Typography noWrap={true} style={styles.toolTipTypography}>
                      {this.nerfNames(name)}
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
    const row: any = this.state.teamLeaders;
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

  handleMoreInfoClick = (e: any, workspace: any) => {
    localStorage.setItem("client_name",workspace.attributes.client_name);
    sessionStorage.setItem("client_id", workspace.id)
    if(workspace?.attributes?.team_leaders?.data?.length > 0){
      if(workspace?.attributes?.template_completed && workspace?.attributes?.template?.id){
        this.props.history.push(`/reviewChecklist?cid=${workspace.id}&tid=${workspace?.attributes?.template?.id}`)
      }
      else this.props.history.push(`/template?cid=${workspace.id}`)
    }
    else { this.props.history.push("/clientfolders"); }
  }

  // Customizable Area End
  render() {
    const ImageBadgeFragment: FunctionComponent = () => {

      const imgPartial = this.state.coverImgFile
        ? this.state.coverImg
        : this.parseImg(this.state.coverImg);
      return this.state.coverImg ? (
        <React.Fragment>
          <Box
            component="div"
            style={styles.fragmentContainer}
          >
            {this.state.edit ? "" :  
            <Input
              type="file"
              style={styles.hide}
              id="icon-button-file"
              onChange={this.handleImageSelect}
            />
          }

            <label htmlFor="icon-button-file">
              <img
                src={imgPartial}
                alt="place-holder image"
                style={styles.uploadImage}
              />
            </label>
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Box
            component="div"
            style={styles.fragmentContainerEmpty}
          >
            <Input
              type="file"
              style={styles.hide}
              id="icon-button-file"
              onChange={this.handleImageSelect}
            />
            <label htmlFor="icon-button-file">
              <IconButton aria-label="upload image" component="span">
                <CloudUploadOutlined />
              </IconButton>
            </label>
          </Box>
          <Typography
            variant="overline"
            style={styles.fragmentTypography}
          >
            UPLOAD CLIENT LOGO
          </Typography>
        </React.Fragment>
      );
    };

    const TeamLeaders = () => {
      const avatars = this.state.teamLeaders.map((user: any, int: number) => {
        const imgPartial = this.parseImg(user.attributes.image);

        return (
          <React.Fragment key={user.id}>
            <Avatar
              style={styles.teamAvatar}
              alt={user.attributes.first_name}
              src={imgPartial}
              key={int}
            />
            <Typography variant="body2" color="textSecondary">
              {`${user.attributes.first_name} ${user.attributes.last_name}`}
            </Typography>
          </React.Fragment>
        );
      });

      return (
        <Box
          style={styles.AvatarContainer}
        >
          {avatars}
        </Box>
      );
    };

    const LoadingState: any = () => {
        this.state.loading &&
        Array(9)
          .fill(null)
          .map((item: null, int: number) => {
            return (
              <React.Fragment key={int}>
                <Grid item sm={12} md={6} lg={4}>
                  <Box
                    style={styles.loadingRoot}
                  >
                    <Skeleton
                      animation="wave"
                      variant="rect"
                      width="100%"
                      style={styles.loadingGutter}
                    >
                      <div style={styles.skeletonStart} />
                    </Skeleton>
                    <Skeleton
                      variant="circle"
                      width={100}
                      height={100}
                      style={styles.skeletonCircle}
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

      const circular = <React.Fragment>
        <Grid item sm={12} md={12} lg={12}>
          <Box style={styles.circularRoot}><CircularProgress size={50} style={styles.progressCircle} /></Box>
        </Grid>
      </React.Fragment>

      return circular
    };

    const resultsFilter = Boolean(this.state.availableTL.length) && this.FilterResults();
    const adminFilter = Boolean(this.state.teamLeaders.length) && this.AdminResults();

    return (
      // Customizable Area Start
      <ThemeProvider theme={theme}>
        <Grid container justifyContent="space-between" style={styles.mainGrid}>
          <Grid item>
            <Grid item>
              <Box style={styles.alignRoot}>
                <Box style={styles.secondaryGrid} />
                <Box style={styles.rootContainer}>
                  <Grid container spacing={2} style={styles.gridMore}>
                    <Grid item xs={12} style={styles.belowwidth}>
                      <Grid
                        container
                        justifyContent="space-between"
                        alignItems="center"
                        spacing={2}
                        style={styles.gridMargin}
                      >

                        <Grid item style={styles.gridLess}>
                          <Typography variant="h6" style={styles.titleText}>
                            {this.clientTitleText}
                          </Typography>
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
                                placeholder="Search Client"
                                value={this.state.searchValue}
                                onChange={this.handleSearch}
                                onCancelSearch={this.cancelSearch}
                                onRequestSearch={this.requestSearch}
                              />
                            </Grid>
                            <Grid item>
                              <Typography
                                variant="h6"
                                style={styles.workspaceTitleText}
                              >
                                Workspace
                              </Typography>
                            </Grid>
                            <Grid item>
                              <FormControl
                                variant="outlined"
                                style={styles.formControl}
                                size="small"
                              >
                                <Select
                                  multiple
                                  value={this.state.workspaceMultipleName}
                                  onChange={this.handleSelectChange}
                                  inputProps={{
                                    name: "client-workspace",
                                    id: "outlined-client-workspace",
                                  }}
                                  renderValue={(selected: any) => {
                                    const joined = selected
                                      .map((id: string) => {
                                        return this.state.clientPairs[id];
                                      })
                                      .join(",");
                                    return this.nerfDescription(joined, true);
                                  }}
                                  style={styles.selectStyles}
                                >
                                  {this.state.clientSources.map((item: any) => (
                                    <MenuItem key={item.id} value={item.id}>
                                      <Checkbox
                                        style={styles.checkedStyles}
                                        checked={
                                          this.state.workspaceMultipleName.indexOf(
                                            item.id
                                          ) > -1
                                        }
                                      />
                                      <ListItemText
                                        primary={item.attributes.name}
                                      />
                                    </MenuItem>
                                  ))}
                                  <MenuItem key={"all"} value={"all"}>
                                    <Checkbox
                                      style={styles.checkedStyles}
                                      checked={this.state.spaceCheck}
                                    />
                                    <ListItemText primary={"All"} />
                                  </MenuItem>
                                </Select>
                              </FormControl>
                            </Grid>
                            <Grid item>
                              <Button
                                variant="contained"
                                disableElevation
                                onClick={this.handleModal}
                                size="large"
                                style={styles.titleButton}
                              >
                                {this.clientTitleButtonText}
                              </Button>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12}>
                      <Grid container justifyContent="space-between" spacing={2}>
                        {this.state.loading ? (
                          <LoadingState />
                        ) : (
                          <Grid container spacing={1}>
                            {this.state.workspaces.map((workspace: any) => {
                              const id = workspace.attributes.workspace?.id + "";
                              const litmusFilter = this.state.workspaceMultipleName.includes(
                                id
                              );

                              const avatars = workspace.attributes.team_leaders.data.map(
                                (user: any) => {
                                  const imgPartial = this.parseImg(
                                    user.attributes.image
                                  );
                                  const name = user.attributes.first_name
                                    ? `${user.attributes.first_name} ${user.attributes.last_name}`
                                    : "default"

                                  return (
                                    <Tooltip title={name} aria-label={`tooltip-${name}`} key={user.id}>
                                      <Avatar
                                        style={styles.workspaceAvatar}
                                        alt={user.attributes.firstname}
                                        src={imgPartial}
                                      />
                                    </Tooltip>
                                  );
                                }
                              );

                              return (
                                litmusFilter && (
                                  <Grid key={workspace.id} item sm={12} md={6} lg={3}>
                                    <Card variant="outlined" style={styles.root} onClick={(e: any) => this.moreDetail(e, workspace.id)}>
                                      <StyledBadge
                                        style={styles.styledBadgeProperties}
                                        badgeContent={
                                          <IconButton
                                            disableRipple={true}
                                            style={styles.styledBadgeIconButton}
                                            aria-controls="fade-menu"
                                            aria-haspopup="true"
                                            id={"edit-icon"}
                                            onClick={(e: any) => {
                                              e.preventDefault();
                                              this.setState(
                                                { anchorEl: e.currentTarget },
                                                () => {
                                                  this.handleClientWorkspaceEdit(
                                                    workspace.id
                                                  ),
                                                    this.setState({
                                                      menuOpen: Boolean(
                                                        this.state.anchorEl
                                                      ),
                                                    });
                                                }
                                              );
                                            }}
                                          >
                                            <MoreHoriz id={"edit-icon"} />
                                          </IconButton>
                                        }
                                      >
                                        <Card
                                          variant="outlined"
                                          style={styles.styledBadgeCard}
                                        >
                                          <img
                                            src={this.parseImg(
                                              workspace.attributes.image
                                            )}
                                            alt={workspace.attributes.type}
                                            style={styles.styledBadgeImage}
                                          />

                                        </Card>
                                      </StyledBadge>
                                      <Menu
                                        elevation={1}
                                        anchorEl={this.state.anchorEl}
                                        open={this.state.menuOpen}
                                        onClose={() => {
                                          this.setState(
                                            {
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
                                          id={"edit-icon"}
                                          onClick={() =>
                                            this.setState({ edit: false, deleteModal: false, editModal: false, titleModal: true, menuOpen: false },
                                              () => {
                                                this.handleModal();
                                              }
                                            )
                                          }
                                        >
                                          Edit
                                        </MenuItem>
                                        <MenuItem
                                          id={"edit-icon"}
                                          onClick={this.handleDeleteModalOpen}
                                        >
                                          Delete
                                        </MenuItem>
                                      </Menu>
                                      <CardContent style={styles.cardContent}>
                                        <Typography
                                          variant="subtitle1"
                                          color="textSecondary"
                                          style={styles.cardContentClientId}
                                        >
                                          ID : {workspace.id}
                                        </Typography>
                                        <Typography
                                          gutterBottom
                                          variant="h6"
                                          component="div"
                                          style={styles.cardContentClientName}
                                        >
                                          {this.nerfDescription(
                                            workspace.attributes.client_name,
                                            false
                                          )}
                                        </Typography>

                                        <Container
                                          style={styles.cardContentContainer}
                                        >
                                          <Typography
                                            variant="body1"
                                            color="textSecondary"
                                            style={styles.descriptionText}
                                          >
                                            {this.nerfDescription(
                                              workspace.attributes.description,
                                              false
                                            )}
                                          </Typography>
                                        </Container>
                                      </CardContent>

                                      <CardActions style={styles.cardActions}>
                                        <Typography
                                          variant="body2"
                                          color="textSecondary"
                                        >
                                          Workspace
                                        </Typography>
                                        <Typography
                                          variant="body2"
                                          color="textSecondary"
                                          style={styles.cardActionsSecondaryText}
                                        >
                                          {workspace.attributes.workspace.name}
                                        </Typography>
                                      </CardActions>
                                      <CardActions style={styles.cardActions}>
                                        <Typography
                                          variant="body2"
                                          color="textSecondary"
                                        >
                                          Team Leader
                                        </Typography>
                                        <AvatarGroup max={5}>{avatars}</AvatarGroup>
                                      </CardActions>
                                      <CardActions style={styles.cardActions}>
                                        {console.log("TeamLeadeer", Object.keys(this.state.teamLeaders).length)}
                                        <Link 
                                        
                                         onClick={(e: any) => this.handleMoreInfoClick(e, workspace)} variant="h6" id="target-link" style={styles.cardActionsActionText}>
                                          More Info
                                        </Link>
                                      </CardActions>
                                    </Card>
                                  </Grid>
                                )
                              );
                            })}
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
                            <Card variant="outlined" style={
                              this.state.deleteModal ?
                                styles.modalCardRootDelete :
                                styles.modalCardRoot}
                            >
                              <CardHeader
                                style={styles.modalCardHeader}
                                disableTypography={true}
                                action={
                                  <>
                                    {this.state.edit ? (
                                      <IconButton
                                        aria-label="edit-modal-open"
                                        onClick={this.handleEditModalOpen}
                                      >
                                        <Typography
                                          style={styles.modalCardHeaderEdit}
                                        >
                                          Edit
                                        </Typography>
                                      </IconButton>
                                    ) : (
                                      ""
                                    )}
                                    <IconButton
                                      aria-label="close"
                                      onClick={this.handleButtonCancel}
                                    >
                                      <Close />
                                    </IconButton>
                                  </>
                                }
                                title={
                                  <Typography
                                    style={styles.modalCardHeaderTitleTypography}
                                  >
                                    {this.resolveTitle()}
                                  </Typography>
                                }
                              />

                              {this.state.editModal && (
                                <CardContent
                                  style={styles.modalCardContentEditModal}
                                >
                                  <ImageBadgeFragment />
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
                                      error={Boolean(this.state.clientNameError)}
                                    >
                                      <InputLabel htmlFor="my-input" />
                                      <input
                                        style={
                                          Boolean(this.state.clientNameError)
                                            ? styles.modalTextFieldError
                                            : styles.modalTextField
                                        }
                                        placeholder="Type Name here"
                                        value={this.state.clientName}
                                        onChange={this.handleFormChange}
                                        name="clientName"
                                      />

                                      <FormHelperText
                                        id="my-helper-text"
                                        style={styles.modalFormHelper}
                                      >
                                        {this.state.clientNameError}
                                      </FormHelperText>
                                    </FormControl>
                                  </Box>
                                  {this.state.clientID && <Box component="form">
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
                                    >
                                      <InputLabel htmlFor="my-input" />
                                      <input
                                        disabled
                                        style={{ ...styles.modalTextField, ...styles.modalCardContentEditModalID }}
                                        type="textarea"
                                        placeholder="Type Name here"
                                        value={`${this.state.clientID ? this.state.clientID : "18AF"}`}
                                        name="clientid"
                                        onChange={this.handleFormChange}
                                      />

                                      <FormHelperText
                                        id="my-helper-text"
                                        style={styles.modalFormHelper}
                                      >
                                      </FormHelperText>

                                    </FormControl>
                                  </Box>}
                                  <Box component="form">
                                    <Typography
                                      variant="subtitle2"
                                      style={
                                        styles.modalCardContentEditModalTypography
                                      }
                                    >
                                      Workspace Name*
                                    </Typography>
                                    <FormControl
                                      fullWidth
                                      error={Boolean(this.state.workspace_idError)}
                                    >
                                      <Select
                                        fullWidth={true}
                                        variant="outlined"
                                        value={this.state.workspace_id ? this.state.workspace_id : "none"}
                                        onChange={this.handleFormSelect}
                                        inputProps={{
                                          name: "client-workspace_id",
                                        }}
                                      >
                                        <MenuItem value="none">
                                          None
                                        </MenuItem>
                                        {this.state.clientSources.map(
                                          (workspace: any, int: number) => {
                                            return (
                                              <MenuItem
                                                value={workspace.id}
                                                key={int}
                                              >
                                                {workspace.attributes.name}
                                              </MenuItem>
                                            );
                                          }
                                        )}
                                      </Select>
                                      <FormHelperText
                                        id="my-helper-text"
                                        style={styles.modalFormHelper}
                                      >
                                        {this.state.workspace_idError}
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
                                      Description
                                    </Typography>
                                    <FormControl
                                      fullWidth
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


                                    </FormControl>
                                  </Box>
                                  <Box component="form">
                                    <Typography
                                      variant="subtitle2"
                                      style={
                                        styles.modalCardContentEditModalTypography
                                      }
                                    >
                                      Contact Details
                                    </Typography>

                                    <FormControl
                                      error={Boolean(this.state.clientContactError)}
                                      fullWidth
                                    >
                                      <InputLabel htmlFor="my-input" />
                                      <input
                                        style={Boolean(this.state.clientContactError) ? styles.modalTextFieldError : styles.modalTextField}
                                        placeholder="Client contact number here"
                                        value={this.state.clientContact}
                                        name="clientContact"
                                        onChange={this.handleFormChange}
                                        type="number"
                                      />

                                    </FormControl>
                                  </Box>
                                  <Box component="form">
                                    <Typography
                                      variant="subtitle2"
                                      style={
                                        styles.modalCardContentEditModalTypography
                                      }
                                    >
                                      Client Address
                                    </Typography>
                                    <FormControl
                                      error={Boolean(this.state.clientAddressError)}
                                      fullWidth
                                    >
                                      <InputLabel htmlFor="my-input" />
                                      <textarea
                                        style={Boolean(this.state.clientAddressError) ? styles.modalTextAreaError : styles.modalTextArea}
                                        rows={4}
                                        placeholder="Client contact details here"
                                        value={this.state.clientAddress}
                                        onChange={this.handleFormChange}
                                        name="clientAddress"
                                      />

                                    </FormControl>
                                  </Box>
                                  <Box component="form">
                                    <Typography
                                      variant="subtitle2"
                                      style={
                                        styles.modalCardContentEditModalTypography
                                      }
                                    >
                                      Team Leader
                                    </Typography>

                                    <FormControl
                                      fullWidth
                                      style={{
                                        ...styles.gutter,
                                      }}
                                    >
                                      <InputLabel htmlFor="my-input" />
                                      <input
                                        autoFocus={false}
                                        style={
                                          Boolean(this.state.adminStringError)
                                            ? styles.modalTextFieldError
                                            : styles.modalTextField
                                        }
                                        multiple
                                        placeholder="Search user"
                                        value={this.state.adminSearchValue}
                                        onChange={this.handleAdminSearch}
                                        name="adminSearchValue"
                                      />
                                    </FormControl>
                                    <>
                                      {resultsFilter}
                                      {adminFilter}
                                    </>
                                  </Box>
                                  <Box component="form">
                                    <Typography
                                      variant="subtitle2"
                                      style={
                                        styles.modalCardContentEditModalTypography
                                      }
                                    >
                                      Client Official Email Address
                                    </Typography>

                                    <FormControl
                                      error={Boolean(this.state.clientOfficialEmailError) || Boolean(this.state.EmailNotProperError)}
                                      fullWidth
                                    >
                                      <InputLabel htmlFor="my-input" />
                                      <input
                                        autoFocus={false}
                                        style={Boolean(this.state.clientOfficialEmailError) ? styles.modalTextFieldError : styles.modalTextField}
                                        placeholder="Client Official email id here"
                                        type="email"
                                        value={this.state.clientOfficialEmail}
                                        onChange={this.handleFormChange}
                                        name="clientOfficialEmail"
                                      />
                                    </FormControl>
                                  </Box>
                                </CardContent>
                              )}

                              {this.state.edit && (
                                <CardContent style={styles.modalCardContentEdit}>
                                  <ImageBadgeFragment />
                                  <Box component="form">
                                    <Typography
                                      variant="subtitle2"
                                      style={
                                        styles.modalCardContentEditTypographySubtitle
                                      }
                                    >
                                      Client Name
                                    </Typography>
                                    <Typography
                                      variant="body2"
                                      style={
                                        styles.modalCardContentEditTypographyBody
                                      }
                                    >
                                      {this.state.clientName}
                                    </Typography>
                                  </Box>
                                  <Box component="form">
                                    <Typography
                                      variant="subtitle2"
                                      style={
                                        styles.modalCardContentEditTypographySubtitle
                                      }
                                    >
                                      Client id
                                    </Typography>
                                    <Typography
                                      variant="body2"
                                      style={
                                        styles.modalCardContentEditTypographyBody
                                      }
                                    >
                                      {this.state.clientID}
                                    </Typography>
                                  </Box>
                                  <Box component="form">
                                    <Typography
                                      variant="subtitle2"
                                      style={
                                        styles.modalCardContentEditTypographySubtitle
                                      }
                                    >
                                      Workspace Name
                                    </Typography>
                                    <Typography
                                      variant="body2"
                                      style={
                                        styles.modalCardContentEditTypographyBody
                                      }
                                    >
                                      {this.state.workspaceName}
                                    </Typography>
                                  </Box>
                                  <Box component="form">
                                    <Typography
                                      variant="subtitle2"
                                      style={
                                        styles.modalCardContentEditTypographySubtitle
                                      }
                                    >
                                      Description
                                    </Typography>

                                    <Typography
                                      variant="body2"
                                      style={
                                        styles.modalCardContentEditTypographyBody
                                      }
                                    >
                                      {this.state.description}
                                    </Typography>
                                  </Box>
                                  <Box component="form">
                                    <Typography
                                      variant="subtitle2"
                                      style={
                                        styles.modalCardContentEditTypographySubtitle
                                      }
                                    >
                                      Contact Details
                                    </Typography>
                                    <Typography
                                      variant="body2"
                                      style={
                                        styles.modalCardContentEditTypographyBody
                                      }
                                    >
                                      {this.state.clientContact}
                                    </Typography>
                                  </Box>
                                  <Box component="form">
                                    <Typography
                                      variant="subtitle2"
                                      style={
                                        styles.modalCardContentEditTypographySubtitle
                                      }
                                    >
                                      Client Address
                                    </Typography>

                                    <Typography
                                      variant="body2"
                                      style={
                                        styles.modalCardContentEditTypographyBody
                                      }
                                    >
                                      {this.state.clientAddress}
                                    </Typography>
                                  </Box>
                                  <Box component="form">
                                    <Typography
                                      variant="subtitle2"
                                      style={
                                        styles.modalCardContentEditTypographySubtitle
                                      }
                                    >
                                      Team Leader
                                    </Typography>

                                    <TeamLeaders />
                                  </Box>
                                  <Box component="form">
                                    <Typography
                                      variant="subtitle2"
                                      style={
                                        styles.modalCardContentEditTypographySubtitle
                                      }
                                    >
                                      Client Official Email Address
                                    </Typography>
                                    <Typography
                                      variant="body2"
                                      style={
                                        styles.modalCardContentEditTypographyBody
                                      }
                                    >
                                      {this.state.clientOfficialEmail}
                                    </Typography>
                                  </Box>
                                </CardContent>
                              )}

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
                                        <Typography align="left">{this.state.clientName} client?</Typography>
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
                                          this.deleteWorkspace();
                                          this.handleButtonCancel();
                                        }}
                                      >
                                        <strong>Yes</strong>
                                      </Button>
                                    </Box>
                                  </CardActions>
                                </>
                              )}
                              {this.state.editModal && (
                                <CardActions style={styles.modalCardActions}>
                                  <Box style={styles.modalCardActionsContainer}>
                                    <Button
                                      disableElevation
                                      variant="contained"
                                      style={styles.modalCancelButton}
                                      onClick={this.handleButtonCancel}
                                    >
                                      {this.cancelButtonText}
                                    </Button>
                                    <Button
                                      disableElevation
                                      variant="contained"
                                      style={styles.modalActionButton}
                                      onClick={this.handleButtonAction}
                                    >
                                      {this.state.titleModal
                                        ? this.actionButtonSaveText
                                        : this.actionButtonAddText}
                                    </Button>
                                  </Box>
                                </CardActions>
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
                <p>{this.state.alertMsg}</p>
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
  formActivePick: { backgroundColor: "#42a5f5", color: "#fff" },
  formContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    border: "1px solid rgba(155, 155, 155, .5)",
    gap: "0.1rem",
    borderRadius: "4px", //
    paddingInline: "8px", //
    paddingBlock: "0.2rem",
    color: "rgba(155, 155, 155, 1)",
  },
  formAvatar: { width: 32, height: 32, backgroundColor: "grey" },
  formToolTipContainer: { cursor: "pointer" },
  toolTipTypography: {
    flexWrap: "nowrap",
    display: "flex",
    fontSize: "small",
  } as React.CSSProperties,
  loadingRoot: {
    display: "flex",
    flexDirection: "column",
  } as React.CSSProperties,
  skeletonStart: {
    paddingTop: "10%", marginBlockEnd: 6
  },
  loadingGutter: {
    marginBlockEnd: 6
  },
  skeletonEnd: { paddingTop: "10%", marginBlockStart: 6 },
  skeletonCircle: { marginBlockEnd: 6, alignSelf: "center" },
  teamAvatar: { width: 32, height: 32, marginInlineEnd: "0.1rem" },
  AvatarContainer: {
    display: "flex",
    paddingBlock: "1rem",
    alignItems: "center",
    gap: ".5rem",
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
  fragmentContainer: {
    alignSelf: "center",
    width: "100px",
    borderRadius: "50%",
    aspectRatio: "1",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
  },
  fragmentContainerEmpty: {
    alignSelf: "center",
    width: "100px",
    borderRadius: "50%",
    aspectRatio: "1",
    border: "2px dashed rgba(155, 155, 155, .2)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  uploadImage: {
    height: "100px",
    objectFit: "cover",
    aspectRatio: "1/1",
    borderRadius: "50%",
    padding: ".5rem",
  } as React.CSSProperties,
  fragmentTypography: {
    alignSelf: "center",
  },
  hide: {
    display: "none"
  },
  modalBackdropProps: {
    borderRadius: "0",
    backgroundColor: "rgba(0, 0, 0, .7)",
    backdropFilter: "blur(10px)",
  },
  modalCardRoot: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 500,
    height: "90%",
    fontSize: "16px",
    marginBlockEnd: "1rem",
    overflow: "scroll",
    display: "flex",
    flexDirection: "column",
  } as React.CSSProperties,

  modalCardRootDelete: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    maxHeight: 300,
    height: "30%",
    fontSize: "16px",
    marginBlockEnd: "1rem",
    overflow: "scroll",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  } as React.CSSProperties,

  modalCardHeaderTitleTypography: { fontWeight: 600 },
  modalCardHeaderEdit: {
    textDecoration: "underline",
    color: "#6a6f7a",
    lineHeight: 1,
    aspectRatio: "1/1",
  },
  modalCardHeader: {
    borderBottom: "1px solid #ccc",
    paddingInline: "1rem",
    gap: "0.3rem",
  },
  modalCardContentEditModalTypography: {
    paddingBlockEnd: 1,
    fontSize: "16px",
    fontWeight: "bold",
    color: "#5f5f5f",
  } as React.CSSProperties,
  modalCardContentEditModalID: {
    backgroundColor: "rgba(200, 200, 200, .4)"
  },
  modalCardContentEditModal: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    gap: "0.1rem",
    padding: "1rem",
    fontSize: "16px",
  } as React.CSSProperties,
  modalCardContentEditTypographySubtitle: {
    paddingBlockEnd: 1,
    fontSize: "16px",
    fontWeight: "bold",
    color: "#5f5f5f",
  } as React.CSSProperties,
  modalCardContentEditTypographyBody: {
    paddingBlockEnd: 1,
    fontSize: "16px",
    color: "#6a6f7a",
  },
  modalCardContentEdit: {
    display: "flex",
    flexDirection: "column",
    alignSelf: "flexStart",
    justifyContent: "center",
    gap: "0.1rem",
    padding: "1rem",
    fontSize: "16px",
  } as React.CSSProperties,
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
  modalCardActionsContainer: { display: "flex", gap: ".5rem" },
  modalCardActions: {
    borderTop: "1px solid #ccc",
    display: "flex",
    justifyContent: "flex-end",
    paddingInline: "1rem",
  },
  mainGrid: {
    flexGrow: 1,
    backgroundColor: "rgba(200, 200, 200, .5)",
    zIndex: -1,
  },
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
  titleText: { fontSize: "medium", fontWeight: 600 },
  workspaceTitleText: {
    fontSize: "18px",
    fontWeight: 600,
    color: "#6a6f7a",
    cursor: "pointer",
    paddingInlineStart: "1rem",
  },
  alert: {
    display: "flex",
    position: "fixed",
    top: 125,
    right: 1,
    zIndex: 4000,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    fontFamily: "sans-serif",
  } as React.CSSProperties,
  root: {
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
    textAlign: "center",
    padding: "1rem", //
    height: 510,
  } as React.CSSProperties,

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
    gap: ".6rem",
    alignItems: "center",
    justifyContent: "center",
    borderBlockStart: "1px solid #ccc",
    minHeight: "60px",
    width: "83%",
    alignSelf: "center",
    cursor: "pointer",
  },
  cardActionsActionText: {
    color: "#42a5f5",
    fontSize: "16px",
    fontWeight: "bold",
    textDecoration: "none",
    textTransform: "none"
  } as React.CSSProperties,
  cardActionsSecondaryText: {
    fontWeight: "bold",
    margin: 0,
  } as React.CSSProperties,
  cardContent: {
  },
  cardContentClientId: {
    fontSize: "small",
  },
  cardContentClientName: {
    fontWeight: "bold",
    fontSize: "18px",
    color: "#000",
  } as React.CSSProperties,
  cardContentContainer: {
    height: "60px",
    overflow: "scroll",
  },
  gutter: {
    marginBlockEnd: "0.4rem",
  },
  descriptionText: {
    fontSize: "16px",
  },
  styledBadgeProperties: {
    display: "flex",
    padding: "1rem",
    justifyContent: "center",
    alignItems: "center",
    boxShadow: "none"
  },
  styledBadgeIconButton: { padding: "1rem", boxShadow: "none" } as React.CSSProperties,
  styledBadgeCard: {
    maxHeight: "200px",
    borderRadius: "50%",
    aspectRatio: "1",
  },
  styledBadgeImage: {
    height: "100px",
    objectFit: "cover",
    aspectRatio: "1/1",
    borderRadius: "50%",
    padding: ".5rem",
    cursor: "pointer"
  } as React.CSSProperties,
  workspaceAvatar: { width: 40, height: 40 },
  titleButton: {
    textTransform: "none",
    backgroundColor: "#42a5f5",
    color: "white",
    paddingInline: "3rem",
  } as React.CSSProperties,
  checkedStyles: {
    color: "#42a5f5",
  },
  selectStyles: {
    backgroundColor: "white",
    fontSize: "16px"
  },
  formControl: { minWidth: 250 },
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

  modalSelectFieldError: {
    fontSize: "16px",
  },
  modalTextFieldError: {
    paddingBlock: "18px",
    fontSize: "16px",
  },
  modalFormHelper: {
    paddingBlock: "0",
    paddingInline: "0",
  },
  modalFormHelperImage: {
    paddingBlock: "0",
    paddingInline: "0",
    alignSelf: "center"
  },
  reactPhoneInput: {
    borderRadius: "4px",
    paddingBlock: "18px",
    paddingInlineStart: "60px",
    paddingInlineEnd: "14.5px",
    fontSize: "16px",
    border: "1px solid rgba(0, 0, 0, .3)",
    width: "100%",
    backgroundColor: "white"
  },
  reactPhoneInputEmpty: {
    borderRadius: "4px",
    paddingBlock: "18px",
    paddingInlineStart: "60px",
    paddingInlineEnd: "14.5px",
    fontSize: "16px",
    border: "1px solid rgba(0, 0, 0, .3)",
    width: "100%",
    backgroundColor: "#fdf5f5"
  },
  excessIcon: {
    color: "white"
  },

  belowwidth: {marginBottom: 20},
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

// Customizable Area End

import { useCallback } from "react";
import { HiDocumentAdd } from "react-icons/hi";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Button, Tag, TagGroup, Notification, toaster } from "rsuite";
import styled from "styled-components";
import ConfigPart from "../../data/ConfigPart";
import IEntity from "../../data/IEntity";
import { RootState } from "../../database/Store";
import { selectDBName } from "../../database/SystemReducer";
import { stringToColour } from "../../services/ColorService";
import { createNewWithId } from "../../services/DatabaseService";
import { findIcon } from "../../services/IconService";
import { findEntityTileField } from "../../services/SystemService";
import { spliceFirstToUpper, firstToUpper } from "../../services/TextService";

interface $Props {
  configs: string[];
  entityName: string;
  entity: IEntity;
  dummyFieldEntry?: ConfigPart;
  isChatTile?: boolean;
}

const EntityTile = ({
  configs,
  entityName,
  entity,
  dummyFieldEntry,
  isChatTile,
}: $Props) => {
  const system = useSelector((state: RootState) => state.system);
  const systemDbName = useSelector(selectDBName);

  const makeFoundFlag = useCallback(
    (config: ConfigPart) => {
      if (config.found) {
        const field = entity[config.found.field as keyof typeof entity];
        const showFlag = (field + "")
          .toLowerCase()
          .includes(config.found.searchTerm);
        return showFlag ? spliceFirstToUpper(config.found.searchTerm) : "";
      }
    },
    [entity]
  );

  const makeProp = useCallback(
    (config: ConfigPart, field: string | number, index: number) => {
      const icon = config.icon;
      if (icon) {
        return (
          <Prop key={index}>
            {findIcon(icon)} {field}
          </Prop>
        );
      } else {
        return <Prop key={index}>{field}</Prop>;
      }
    },
    []
  );

  const makeWideSetAttributesProp = useCallback(
    (config: ConfigPart, field: string | number | string[], index: number) => {
      const icon = config.icon;
      if (icon) {
        return (
          <WideSetProp key={index}>
            {findIcon(icon)}
            <Tags>
              {Array.isArray(field) &&
                field.map((vals: string, tagIndex: number) => (
                  <Tag key={"" + index + tagIndex}>{vals}</Tag>
                ))}
            </Tags>
          </WideSetProp>
        );
      } else {
        return (
          <WideSetProp key={index}>
            <Tags>
              {Array.isArray(field) &&
                field.map((vals: string, tagIndex: number) => (
                  <Tag key={"" + index + tagIndex}>{vals}</Tag>
                ))}
            </Tags>
          </WideSetProp>
        );
      }
    },
    []
  );

  const makeWideSetEntitiesProp = useCallback(
    (config: ConfigPart, field: string | number | string[], index: number) => {
      const icon = config.icon;
      if (icon) {
        return (
          <WideSetProp key={index}>
            {findIcon(icon)}
            <Tags>
              {Array.isArray(field) &&
                field.map((vals: string, tagIndex: number) => (
                  <Tag key={"" + index + tagIndex}>{vals}</Tag>
                ))}
            </Tags>
          </WideSetProp>
        );
      } else {
        return (
          <WideSetProp key={index}>
            <Tags>
              {Array.isArray(field) &&
                field.map((vals: string, tagIndex: number) => (
                  <Tag key={"" + index + tagIndex}>{vals}</Tag>
                ))}
            </Tags>
          </WideSetProp>
        );
      }
    },
    []
  );

  const makeSmallSetProp = useCallback(
    (config: ConfigPart, field: string | number | string[], index: number) => {
      const icon = config.icon;
      if (icon) {
        return (
          <SmallSetProp key={index}>
            {findIcon(icon)}
            <Tags>
              <Tag>{field}</Tag>
            </Tags>
          </SmallSetProp>
        );
      } else {
        return (
          <SmallSetProp key={index}>
            <Tags>
              <Tag>{field}</Tag>
            </Tags>
          </SmallSetProp>
        );
      }
    },
    []
  );

  const makeWideProp = useCallback(
    (config: ConfigPart, field: string | number, index: number) => {
      const icon = config.icon;
      if (icon) {
        return (
          <WideProp key={index}>
            {findIcon(icon)} {field}
          </WideProp>
        );
      } else {
        return <WideProp key={index}>{field}</WideProp>;
      }
    },
    []
  );

  const getPicture = useCallback(() => {
    const picBase64 = entity["picBase64" as keyof typeof entity];
    const pic = entity["pic" as keyof typeof entity];
    if (picBase64 !== "" && picBase64 !== null && picBase64 !== undefined) {
      return picBase64 + "";
    } else if (pic !== "" && pic !== null && pic !== undefined) {
      return pic + "";
    }
    return "";
  }, [entity]);

  const addNewEntity = () => {
    let newObj = { ...entity };
    delete newObj.id;
    createNewWithId(systemDbName, entityName, newObj, (id) => {
      toaster.push(
        <Notification closable header={"Success"} type="success">
          Success: Adding successful!.
        </Notification>,
        { placement: "bottomStart" }
      );
    });
  };

  return (
    <Tile to={isChatTile ? "#" : `/${entityName}-detail/${entity.id}`}>
      {configs.map((keyName: any, index: number) => {
        const field = entity[keyName as keyof typeof entity];
        const fieldEntry: ConfigPart = dummyFieldEntry
          ? dummyFieldEntry
          : findEntityTileField(system, entityName, keyName);
        if (field !== undefined) {
          switch (true) {
            case fieldEntry.type === "Flag":
              return <Flag key={index}>{field}</Flag>;
            case fieldEntry.type === "ColoredFlag":
              return (
                <ColoredFlag key={index} toColor={field + ""}>
                  {findIcon(fieldEntry.icon)} {firstToUpper(field + "")}
                </ColoredFlag>
              );
            case fieldEntry.type === "RoundNumberFlag":
              return <RoundNumberFlag key={index}>{field}</RoundNumberFlag>;
            case fieldEntry.type === "BooleanFlag":
              return (
                <Flag key={index}>
                  {!!field ? spliceFirstToUpper(keyName) : ""}
                </Flag>
              );
            case fieldEntry.type === "ImageName":
              return (
                <>
                  {getPicture() !== "" ? (
                    <ImageName key={index}>
                      <Image pic={getPicture()}></Image>
                      <b>{entity.name}</b>
                    </ImageName>
                  ) : (
                    <Name key={index}>
                      <b>{entity.name}</b>
                    </Name>
                  )}
                </>
              );
            case fieldEntry.type === "SmallProp":
              return <>{makeProp(fieldEntry, field, index)}</>;
            case fieldEntry.type === "WideSetEntitiesProp":
              return <>{makeWideSetEntitiesProp(fieldEntry, field, index)}</>;
            case fieldEntry.type === "WideSetAttributesProp":
              return <>{makeWideSetAttributesProp(fieldEntry, field, index)}</>;
            case fieldEntry.type === "SmallSetProp":
              return <>{makeSmallSetProp(fieldEntry, field, index)}</>;
            case fieldEntry.type === "WideProp":
              return <>{makeWideProp(fieldEntry, field, index)}</>;
            default:
              return <></>;
          }
        } else {
          switch (true) {
            case fieldEntry.type === "FoundFlag":
              return <Flag key={index}>{makeFoundFlag(fieldEntry)}</Flag>;
            default:
              return <></>;
          }
        }
      })}
      {isChatTile && (
        <AddWrapper>
          <Button appearance="primary" onClick={() => addNewEntity()}>
            <HiDocumentAdd />
          </Button>
        </AddWrapper>
      )}
    </Tile>
  );
};

export default EntityTile;

const Tile = styled(Link)`
  flex: 1 1 20em;
  display: block;
  max-width: 300px;
  color: ${({ theme }) => theme.textColor};
  background-color: ${({ theme }) => theme.secondColor};
  border-radius: 10px;
  box-shadow: ${({ theme }) => theme.mainColor};
  overflow: hidden;
  cursor: pointer;

  &:hover {
    color: ${({ theme }) => theme.textColor};
  }
`;

type $ColoredFlag = {
  toColor?: string;
};

const ColoredFlag = styled.div<$ColoredFlag>`
  height: auto;
  float: left;
  padding: 5px 10px 7px 10px;
  font-size: 12px;
  line-height: 30px;
  color: ${(props) => {
    return stringToColour(props.toColor);
  }};
`;

const RoundNumberFlag = styled.div`
  float: right;

  padding: 10px;
  margin: 5px;
  width: 40px;
  height: 40px;

  line-height: 20px;
  text-align: center;

  border-radius: 30px;
  border-bottom: solid 1px ${({ theme }) => theme.highlight};
`;

const Name = styled.div`
  height: auto;
  float: left;
  padding: 10px;
  margin: 0 5px 5px 5px;
  font-size: 14px;
  width: calc(100% - 30px);
  color: ${({ theme }) => theme.textColor};
  text-align: center;
  border-radius: 5px;
`;

const ImageName = styled.div`
  height: 40px;
  float: left;
  padding: 10px;
  margin: 0 5px 5px 5px;
  font-size: 14px;
  width: calc(100% - 30px);
  color: ${({ theme }) => theme.textColor};
  text-align: center;
  border-radius: 50px 5px 5px 50px;
`;

const Prop = styled.div`
  height: 30px;
  width: calc(50% - 22.5px);
  margin: 0 0 5px 5px;
  float: left;
  line-height: 10px;
  padding: 10px;
  font-size: 12px;
  color: ${({ theme }) => theme.secondTextColor};
  border-radius: 5px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;

  &:nth-child(odd) {
    margin: 0 0 5px 0px;
  }

  svg {
    margin-right: 5px;
    width: 12px;
    height: auto;
    border-radius: 150px;
    color: ${({ theme }) => theme.highlight};
  }
`;

const WideProp = styled(Prop)`
  margin: 0 0 5px 0px;
  width: calc(100% - 20px);
  display: flex;
`;

const WideSetProp = styled(WideProp)`
  height: auto;
`;

const SmallSetProp = styled(WideProp)`
  margin: 0 0 5px 0px;
  height: auto;
  display: flex;
`;

const Flag = styled.div`
  height: auto;
  float: left;
  padding: 5px 10px 7px 10px;
  margin-left: 5px;
  font-size: 12px;
  line-height: 30px;
  border-radius: 0px 0px 10px 10px;
`;

interface $ImageProps {
  pic: string;
}

const Image = ({ pic }: $ImageProps) => {
  const style = {
    backgroundImage: `url(${pic})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  };

  if (pic !== "") {
    return <ImageElm style={style}></ImageElm>;
  } else {
    return <Empty />;
  }
};

const ImageElm = styled.div`
  margin: -10px 5px -10px -10px;
  height: 47px;
  width: 47px;
  float: left;
  border-radius: 100px;
  border: 3px solid ${({ theme }) => theme.highlight};
  box-shadow: 0px 0px 10px 0px rgba(172, 172, 172, 0.2);
  background-color: white;
  overflow: hidden;
`;
const Empty = styled.div``;

const Tags = styled(TagGroup)`
  width: inherit;
  white-space: normal;
`;

const AddWrapper = styled.div`
  position: absolute;
  bottom: 10px;
  right: 10px;
`;

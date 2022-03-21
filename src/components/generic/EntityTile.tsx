import { useCallback } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Tag, TagGroup } from "rsuite";
import styled from "styled-components";
import IEntity from "../../data/IEntity";
import { RootState } from "../../database/Store";
import { stringToColour } from "../../services/ColorService";
import { findIcon } from "../../services/IconService";
import { findTileField, getTileConfig } from "../../services/SystemService";
import { spliceFirstToUpper, firstToUpper } from "../../services/TextService";

interface $Props {
  entityName: string;
  entity: IEntity;
}

const EntityTile = ({ entityName, entity }: $Props) => {
  const system = useSelector((state: RootState) => state.system);

  const makeFoundFlag = useCallback(
    (code: string) => {
      const splitCode: string[] = code.split("|")[1]?.split(":");
      const field = entity[splitCode[0] as keyof typeof entity];
      const showFlag = (field + "").toLowerCase().includes(splitCode[1]);
      return showFlag ? spliceFirstToUpper(splitCode[1]) : "";
    },
    [entity]
  );

  const makeProp = useCallback(
    (code: string, field: string | number, index: number) => {
      const icon: string = code.split("|")[1];
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

  const makeWideSetProp = useCallback(
    (code: string, field: string | number | string[], index: number) => {
      const icon: string = code.split("|")[1];
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
    (code: string, field: string | number | string[], index: number) => {
      const icon: string = code.split("|")[1];
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
    (code: string, field: string | number, index: number) => {
      const icon: string = code.split("|")[1];
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

  return (
    <Tile to={`/${entityName}-detail/${entity.id}`}>
      {Object.getOwnPropertyNames(getTileConfig(system, entityName)).map(
        (keyName: any, index: number) => {
          const field = entity[keyName as keyof typeof entity];
          const fieldEntry = findTileField(system, entityName, keyName);
          if (field !== undefined) {
            switch (true) {
              case fieldEntry === "Flag":
                return <Flag key={index}>{field}</Flag>;
              case fieldEntry.includes("ColoredFlag"):
                return (
                  <ColoredFlag key={index} toColor={field + ""}>
                    {findIcon(fieldEntry.split("|")[1])}{" "}
                    {firstToUpper(field + "")}
                  </ColoredFlag>
                );
              case fieldEntry === "RoundNumberFlag":
                return <RoundNumberFlag key={index}>{field}</RoundNumberFlag>;
              case fieldEntry === "BooleanFlag":
                return (
                  <Flag key={index}>
                    {!!field ? spliceFirstToUpper(keyName) : ""}
                  </Flag>
                );
              case fieldEntry === "ImageName":
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
              case fieldEntry.includes("SmallProp"):
                return <>{makeProp(fieldEntry, field, index)}</>;
              case fieldEntry.includes("WideSetProp"):
                return <>{makeWideSetProp(fieldEntry, field, index)}</>;
              case fieldEntry.includes("SmallSetProp"):
                return <>{makeSmallSetProp(fieldEntry, field, index)}</>;
              case fieldEntry.includes("WideProp"):
                return <>{makeWideProp(fieldEntry, field, index)}</>;
              default:
                return <></>;
            }
          } else {
            switch (true) {
              case fieldEntry.includes("FoundFlag"):
                return <Flag key={index}>{makeFoundFlag(fieldEntry)}</Flag>;
              default:
                return <></>;
            }
          }
        }
      )}
    </Tile>
  );
};

export default EntityTile;

const Tile = styled(Link)`
  flex: 1 1 20em;
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

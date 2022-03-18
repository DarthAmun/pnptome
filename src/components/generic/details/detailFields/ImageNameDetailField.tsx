import { useCallback, useState } from "react";
import { FaCheck, FaImage } from "react-icons/fa";
import { Input, InputGroup } from "rsuite";
import styled from "styled-components";
import IEntity from "../../../../data/IEntity";

interface $ImageNameDetailFieldProps {
  entity: IEntity;
  isNew: boolean;
  field: any;
  keyName: string;
  onEdit: (value: any) => void;
  changeEntity: (entity: IEntity) => void;
}

const ImageNameDetailField = ({
  entity,
  isNew,
  field,
  keyName,
  onEdit,
  changeEntity,
}: $ImageNameDetailFieldProps) => {
  const [imageNameEdit, editImageName] = useState<boolean>(isNew);

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

  return getPicture() !== "" ? (
    <ImageName isEditing={imageNameEdit} onClick={() => editImageName(true)}>
      {imageNameEdit && (
        <>
          <InputGroup style={{ width: "max-content" }}>
            <InputGroup.Addon>
              <FaImage />
            </InputGroup.Addon>
            <Input
              placeholder={"Link to image"}
              value={entity["pic" as keyof typeof entity]}
              onChange={(val: any) =>
                changeEntity({ ...entity, ["pic" as keyof typeof entity]: val })
              }
              onKeyPress={(e: any) => {
                if (e.key === "Enter") {
                  editImageName(false);
                  onEdit(entity);
                }
              }}
            />
            <InputGroup.Button
              onClick={(e) => {
                e.stopPropagation();
                editImageName(false);
                onEdit(entity);
              }}
            >
              <FaCheck />
            </InputGroup.Button>
          </InputGroup>
          <InputGroup style={{ width: "max-content" }}>
            <Input
              placeholder={"Spell name"}
              value={entity.name}
              onChange={(val: any) => changeEntity({ ...entity, name: val })}
              onKeyPress={(e: any) => {
                if (e.key === "Enter") {
                  editImageName(false);
                  onEdit(entity);
                }
              }}
              style={{ width: "max-content", minWidth: "200px" }}
            />
            <InputGroup.Button
              onClick={(e) => {
                e.stopPropagation();
                editImageName(false);
                onEdit(entity);
              }}
            >
              <FaCheck />
            </InputGroup.Button>
          </InputGroup>
        </>
      )}
      {!imageNameEdit && (
        <>
          <Image pic={getPicture()}></Image>
          <b>{entity.name}</b>
        </>
      )}
    </ImageName>
  ) : (
    <Name isEditing={imageNameEdit} onClick={() => editImageName(true)}>
      {imageNameEdit && (
        <>
          <InputGroup style={{ width: "max-content" }}>
            <InputGroup.Addon>
              <FaImage />
            </InputGroup.Addon>
            <Input
              placeholder={"Link to image"}
              value={entity["pic" as keyof typeof entity]}
              onChange={(val: any) =>
                changeEntity({ ...entity, ["pic" as keyof typeof entity]: val })
              }
              onKeyPress={(e: any) => {
                if (e.key === "Enter") {
                  editImageName(false);
                  onEdit(entity);
                }
              }}
            />
            <InputGroup.Button
              onClick={(e) => {
                e.stopPropagation();
                editImageName(false);
                onEdit(entity);
              }}
            >
              <FaCheck />
            </InputGroup.Button>
          </InputGroup>
          <InputGroup style={{ width: "max-content" }}>
            <Input
              placeholder={"Spell name"}
              value={entity.name}
              onChange={(val: any) => changeEntity({ ...entity, name: val })}
              onKeyPress={(e: any) => {
                if (e.key === "Enter") {
                  editImageName(false);
                  onEdit(entity);
                }
              }}
              style={{ width: "max-content", minWidth: "200px" }}
            />
            <InputGroup.Button
              onClick={(e) => {
                e.stopPropagation();
                editImageName(false);
                onEdit(entity);
              }}
            >
              <FaCheck />
            </InputGroup.Button>
          </InputGroup>
        </>
      )}
      {!imageNameEdit && <b>{entity.name}</b>}
    </Name>
  );
};

export default ImageNameDetailField;

const Name = styled.div<{
  isEditing?: boolean;
}>`
  height: auto;
  float: left;
  padding: 10px;
  margin: 5px 0px 10px 0px;
  width: calc(100% - 15px);
  color: ${({ theme }) => theme.textColor};
  text-align: center;
  border-radius: 5px;
  background-color: ${({ theme }) => theme.secondColor};
  display: ${(props) => (props.isEditing ? "flex" : "block")};
  flex-wrap: wrap;
  gap: 5px;
  cursor: pointer;
`;

const ImageName = styled(Name)`
  height: auto;
  border-radius: 50px 5px 5px 50px;
  cursor: pointer;
`;

interface $ImageProps {
  pic: string;
}

const Image = ({ pic }: $ImageProps) => {
  const style = {
    backgroundImage: `url('${pic}')`,
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
  background-color: white;
  overflow: hidden;
`;
const Empty = styled.div``;

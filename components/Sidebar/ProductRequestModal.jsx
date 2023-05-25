import React, {useEffect, useRef, useState} from 'react';
import { toast } from 'react-toastify';
import { http, post } from '../../services/httpService';

const ProductRequestModal = () => {
  const [base64IMG, setBase64IMG] = useState();
  const inputFileRef = useRef();
  let [row, setRow] = useState([
    {
      name: '',
      description: '',
      image: '',
    },
  ]);

  const addNewRow = () => {
    setRow([
      ...row,
      {
        name: '',
        description: '',
        image: '',
      },
    ]);
  };
  const deleteRow = (e, index) => {
    const newArray = Object.values(row).filter((item, i) => {
      if (index != i) {
        return item;
      }
    });
    setRow(newArray);

  };



  const getBase64 = (file) => {
    return new Promise((resolve) => {
      let fileInfo;
      let baseURL = '';
      // Make new FileReader
      let reader = new FileReader();

      // Convert the file to base64 text
      reader.readAsDataURL(file);

      // on reader load somthing...
      reader.onload = () => {
        // Make a fileInfo Object

        baseURL = reader.result;
        resolve(baseURL);
      };
    });
  };

  const handleChange = async (e, index) => {
    // var data = ''
    e.persist();
    var data;
    if (e.target.name == 'image') {
      data = await getBase64(e.target.files[0]).then((res) => {
        return res;
      });
    }

    const newArray = Object.values(row).map((item, i) => {
      if (index == i) {
        if (e.target.name == 'image') {
          return { ...item, [e.target.name]: data };
        } else {
          return { ...item, [e.target.name]: e.target.value };
        }
      } else {
        return item;
      }
    });

    setRow(newArray);
  };
  const submitData = () => {
    const validation = row.every(item => item.name && item.description && item.image);
    if(validation){
      http.post({
        url: 'product-request?platform=web',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        payload: row,
        before: () => {},
        successed: (res) => {
          console.log(res);
          var genericModalEl = document.getElementById("staticBackdropModal");
          var modal = bootstrap.Modal.getInstance(genericModalEl);
          modal.hide();
          setRow([
            {
              name: '',
              description: '',
              image: '',
            }
          ]);
          toast.success('Product request send successfully')
        },
        failed: () => {},
      });
    }else{
      toast.error('All field are required')
    }
  };
  const onClose = () => {
    setRow([
      {
        name: '',
        description: '',
        image: '',
      }
    ]);
    if(inputFileRef.current != null) {
      inputFileRef.current.value = null
    }
  };


  return (
    <>
      <div
        class="modal fade product-request-modal"
        id="staticBackdropModal"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
          <div class="modal-content">
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={onClose}
            ></button>

            <div class="modal-body">
              <div className="row">
                <div className="col-12">
                  <div className="common-fieldset-main">
                    <fieldset className="common-fieldset">
                      <legend className="rounded"> Product Request Form</legend>
                      <table
                        id="employee-table"
                        className="table table-bordered table-responsive"
                      >
                        <thead>
                          <tr>
                            <th className="text-center">Sl No.</th>
                            <th className="text-center">Name</th>
                            <th className="text-center">Desciption</th>
                            <th className="text-center">Image</th>
                            <th className="text-center">preview</th>
                            <th className="text-center">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {Object.values(row).map((value,key) => {
                            return (
                              <tr key={key}>
                                <td className="text-center">{key + 1}</td>
                                <td>
                                  <input
                                    type="text"
                                    name={'name'}
                                    onChange={(e) => handleChange(e, key)}
                                    className={'form-control'}
                                    value={value.name}
                                  />
                                </td>
                                <td>
                                  <input
                                    type="text"
                                    name={'description'}
                                    onChange={(e) => handleChange(e, key)}
                                    className={'form-control'}
                                    value={value.description}
                                  />
                                </td>
                                <td>
                                  <input
                                    type="file"
                                    className={'form-control'}
                                    name={'image'}
                                    ref={inputFileRef}
                                    onChange={(e) => handleChange(e, key)}
                                  />
                                </td>
                                <td className='text-center preview-image'>
                                  <img src={value.image} alt=""/>
                                </td>
                                <td>
                                  <button
                                    type={'btn'}
                                    onClick={(e) => deleteRow(e, key)}
                                    className="btn delet-list-btn"
                                  >
                                   <i class="fa-solid fa-trash"></i>
                                  </button>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                      <div className="button-flex">
                        <button onClick={submitData} className="btn submit-btn">
                          Submit
                        </button>
                        <button onClick={addNewRow} className="btn add-new-row">
                          <i class="fa-solid fa-plus"></i> more
                        </button>
                      </div>
                    </fieldset>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductRequestModal;

import React, { useState } from 'react';

const ProductRequestForm = () => {
  return (
    <>
      <div
        class="modal fade show"
        id="ProductRwquestModal"
        tabindex="-1"
        aria-labelledby="ProductRwquestModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="ProductRwquestModalLabel">
                Modal title
              </h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Autem
              quae ea beatae eum rem soluta, cum consequuntur veniam esse
              voluptate! Consequatur animi dolorem harum et a reiciendis
              accusantium eos excepturi! Lorem, ipsum dolor sit amet consectetur
              adipisicing elit. Autem quae ea beatae eum rem soluta, cum
              consequuntur veniam esse voluptate! Consequatur animi dolorem
              harum et a reiciendis accusantium eos excepturi! Lorem, ipsum
              dolor sit amet consectetur adipisicing elit. Autem quae ea beatae
              eum rem soluta, cum consequuntur veniam esse voluptate!
              Consequatur animi dolorem harum et a reiciendis accusantium eos
              excepturi! Lorem, ipsum dolor sit amet consectetur adipisicing
              elit. Autem quae ea beatae eum rem soluta, cum consequuntur veniam
              esse voluptate! Consequatur animi dolorem harum et a reiciendis
              accusantium eos excepturi!
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="button" class="btn btn-primary">
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductRequestForm;

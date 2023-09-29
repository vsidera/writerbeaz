import React, { useState, useEffect } from 'react'
import AdminSidebar from '../Layout/AdminSidebar'
import AdminAddCategoryModal from './AdminAddCategoryModal'
import Loading from '../Layout/Loading';
import api from '../../api/axiosConfig';
import BlockUnblockModal from '../Layout/BlockUnblockModal';

function AdminCategory() {

  const [categoryData, setCategoryData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [loading, setLoading] = useState(true);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [blockAction, setBlockAction] = useState(true);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const updateCategoryDataInParent = (newCategoryData) => {
    setCategoryData(newCategoryData);
  };

  const fetchCategoryData = () => {
    api
      .get('/admin/categories/')
      .then((response) => {
        setCategoryData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching category data:', error);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchCategoryData();
  }, []);

  const openCategoryModal = (categoryId, blockAction) => {
    setSelectedCategoryId(categoryId);
    setBlockAction(blockAction);
    setIsCategoryModalOpen(true);
  };
  
  const closeCategoryModal = () => {
    setIsCategoryModalOpen(false);
  };

  const handleBlockUnblockCategory = (categoryId) => {
    const newStatus = !blockAction;
    const endpoint = `/admin/block-unblock-category/${categoryId}/`;
  
    api
      .post(endpoint, { is_active: newStatus })
      .then((response) => {
        console.log('Block/Unblock response:', response);
  
        const updatedCategoryData = categoryData.map((category) => {
          if (category.id === categoryId) {
            return { ...category, is_active: newStatus };
          }
          return category;
        });
        setCategoryData(updatedCategoryData);
  
        closeCategoryModal();
        setBlockAction(newStatus);
      })
      .catch((error) => {
        console.error('Error blocking/unblocking category:', error);
      });
  };
  
  

  return (
    <div>
        <AdminSidebar />
        
        <div className="ml-auto mb-6 lg:w-[75%] xl:w-[80%] 2xl:w-[85%]">
        <div className="top-0 h-16 border-b-2 bg-white lg:py-2.5">
          <div className="px-6 flex items-center justify-between space-x-4 2xl:container">
            <h5 className="text-2xl text-black font-medium lg:block">Category Management</h5>
            <div className="flex space-x-4">
              <div className="md:block">
                <div className="relative flex items-center text-gray-400">
                  <button className="group relative h-10 w-32 overflow-hidden rounded-2xl bg-blue-500 text-base font-bold text-white" onClick={openModal}>
                    Add Category
                    <div className="absolute inset-0 h-full w-full scale-0 rounded-2xl transition-all duration-300 group-hover:scale-100 group-hover:bg-blue-700/30"></div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {loading ? (
          <Loading />
        ) : (
          <div className="px-6 pt-6 2xl:container mx-auto max-w-[your-width] overflow-x-auto">
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg lg:ml-64 mb-10">
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-800 dark:text-white">
                  <tr>
                    <th scope="col" className="px-6 py-3 md:px-3">
                      <span className="hidden md:block">Category</span>
                    </th>
                    <th scope="col" className="px-6 py-3 md:px-3">
                      <span className="hidden md:block">Name</span>
                    </th>
                    <th scope="col" className="px-6 py-3 md:px-3">
                      <span className="hidden md:block">Description</span>
                    </th>
                    <th scope="col" className="px-6 py-3 md:px-3">
                      <span className="hidden md:block">Status</span>
                    </th>
                    <th scope="col" className="px-6 py-3 md:px-3">
                      <span className="hidden md:block">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {categoryData.map((category) => (
                    <tr
                    key={category.id}
                    className="bg-white border-b dark:bg-black dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-900"
                  >
                    <td className="flex px-3 py-2 md:px-6 md:py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        <img
                          src={category.image}
                          className="w-24 h-24 rounded-full border border-white mr-3"
                          alt={category.name}
                        />
                    </td>
                    <td className="px-3 py-2 md:px-6 md:py-4">
                      {category.name}
                    </td>
                    <td className="px-3 py-2 md:px-6 md:py-4">
                      {category.description}
                    </td>
                    <td className="px-3 py-2 md:px-6 md:py-4">
                      {category.is_active ? 'Active' : 'Inactive'}
                    </td>
                    <td className="px-3 py-2 md:px-6 md:py-4">
                      <button
                        onClick={() => openCategoryModal(category.id, category.is_active)}
                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline md:ml-2"
                      >
                        {category.is_active ? 'Block' : 'Unblock'}
                      </button>
                    </td>
                  </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      <AdminAddCategoryModal isOpen={isModalOpen} closeModal={closeModal} updateCategoryData={updateCategoryDataInParent}/>
      <BlockUnblockModal
        isOpen={isCategoryModalOpen}
        onRequestClose={closeCategoryModal}
        onConfirm={() => handleBlockUnblockCategory(selectedCategoryId)}
      />
    </div>
  )
}

export default AdminCategory

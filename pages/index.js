import { GiMoneyStack } from "react-icons/gi";

export default function Home() {
  return (
    <main className="flex-1 overflow-x-hidden overflow-y-auto">
      <div className="mx-auto px-6 pb-8">
        <div className="mt-4">
          <div className="grid grid-cols-3 gap-4">
            <div className="rounded-lg">
              <div className="flex items-center px-5 py-6 shadow-sm rounded-md bg-white">
                <div className="p-3 rounded-full bg-sky-500 bg-opacity-75 text-white">
                  <GiMoneyStack size={30} />
                </div>

                <div className="mx-5">
                  <h4 className="text-2xl font-semibold text-gray-700">12.500.000</h4>
                  <div className="text-gray-500">Uang Masuk</div>
                </div>
              </div>
            </div>
            <div className="rounded-lg">
              <div className="flex items-center px-5 py-6 shadow-sm rounded-md bg-white">
                <div className="p-3 rounded-full bg-rose-500 bg-opacity-75 text-white">
                  <GiMoneyStack size={30} />
                </div>

                <div className="mx-5">
                  <h4 className="text-2xl font-semibold text-gray-700">2.750.000</h4>
                  <div className="text-gray-500">Uang Keluar</div>
                </div>
              </div>
            </div>
            <div className="rounded-lg">
              <div className="flex items-center px-5 py-6 shadow-sm rounded-md bg-white">
                <div className="p-3 rounded-full bg-green-500 bg-opacity-75 text-white">
                  <GiMoneyStack size={30} />
                </div>

                <div className="mx-5">
                  <h4 className="text-2xl font-semibold text-gray-700">1.560.000</h4>
                  <div className="text-gray-500">Total Hutang</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8">

        </div>

        <div className="flex flex-col mt-8">
          <div className="py-2 overflow-x-auto">
            <div
              className="align-middle inline-block min-w-full overflow-hidden sm:rounded-lg ">
              <table className="min-w-full">
                <thead>
                  <tr>
                    <th
                      className="px-6 py-3 border-b border-gray-200 bg-white text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                      Nama</th>
                    <th
                      className="px-6 py-3 border-b border-gray-200 bg-white text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                      Alamat</th>
                    <th
                      className="px-6 py-3 border-b border-gray-200 bg-white text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                      Status</th>
                    <th
                      className="px-6 py-3 border-b border-gray-200 bg-white text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                      Jabatan</th>
                    <th className="px-6 py-3 border-b border-gray-200 bg-white"></th>
                  </tr>
                </thead>

                <tbody className="bg-white">
                  <tr>
                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <img className="h-10 w-10 rounded-full"
                            src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"
                            alt="" />
                        </div>

                        <div className="ml-4">
                          <div className="text-sm leading-5 font-medium text-gray-900">Budi Raharja
                          </div>
                          <div className="text-sm leading-5 text-gray-500">budi@gmail.com</div>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                      <div className="text-sm leading-5 text-gray-900">Jakarta Selatan</div>
                      <div className="text-sm leading-5 text-gray-500">Cilandak</div>
                    </td>

                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                      <span
                        className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Active</span>
                    </td>

                    <td
                      className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5 text-gray-500">
                      Owner</td>

                    <td
                      className="px-6 py-4 whitespace-no-wrap text-right border-b border-gray-200 text-sm leading-5 font-medium">
                      <a href="#" className="text-indigo-600 hover:text-indigo-900">Edit</a>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <img className="h-10 w-10 rounded-full"
                            src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"
                            alt="" />
                        </div>

                        <div className="ml-4">
                          <div className="text-sm leading-5 font-medium text-gray-900">David Bayu
                          </div>
                          <div className="text-sm leading-5 text-gray-500">david@gmail.com</div>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                      <div className="text-sm leading-5 text-gray-900">Jakarta Selatan</div>
                      <div className="text-sm leading-5 text-gray-500">Ciledug</div>
                    </td>

                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                      <span
                        className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Active</span>
                    </td>

                    <td
                      className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5 text-gray-500">
                      Pegawai</td>

                    <td
                      className="px-6 py-4 whitespace-no-wrap text-right border-b border-gray-200 text-sm leading-5 font-medium">
                      <a href="#" className="text-indigo-600 hover:text-indigo-900">Edit</a>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <img className="h-10 w-10 rounded-full"
                            src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"
                            alt="" />
                        </div>

                        <div className="ml-4">
                          <div className="text-sm leading-5 font-medium text-gray-900">David Bayu
                          </div>
                          <div className="text-sm leading-5 text-gray-500">david@gmail.com</div>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                      <div className="text-sm leading-5 text-gray-900">Jakarta Selatan</div>
                      <div className="text-sm leading-5 text-gray-500">Ciledug</div>
                    </td>

                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                      <span
                        className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Active</span>
                    </td>

                    <td
                      className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5 text-gray-500">
                      Pegawai</td>

                    <td
                      className="px-6 py-4 whitespace-no-wrap text-right border-b border-gray-200 text-sm leading-5 font-medium">
                      <a href="#" className="text-indigo-600 hover:text-indigo-900">Edit</a>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <img className="h-10 w-10 rounded-full"
                            src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"
                            alt="" />
                        </div>

                        <div className="ml-4">
                          <div className="text-sm leading-5 font-medium text-gray-900">David Bayu
                          </div>
                          <div className="text-sm leading-5 text-gray-500">david@gmail.com</div>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                      <div className="text-sm leading-5 text-gray-900">Jakarta Selatan</div>
                      <div className="text-sm leading-5 text-gray-500">Ciledug</div>
                    </td>

                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                      <span
                        className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Active</span>
                    </td>

                    <td
                      className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5 text-gray-500">
                      Pegawai</td>

                    <td
                      className="px-6 py-4 whitespace-no-wrap text-right border-b border-gray-200 text-sm leading-5 font-medium">
                      <a href="#" className="text-indigo-600 hover:text-indigo-900">Edit</a>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <img className="h-10 w-10 rounded-full"
                            src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"
                            alt="" />
                        </div>

                        <div className="ml-4">
                          <div className="text-sm leading-5 font-medium text-gray-900">David Bayu
                          </div>
                          <div className="text-sm leading-5 text-gray-500">david@gmail.com</div>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                      <div className="text-sm leading-5 text-gray-900">Jakarta Selatan</div>
                      <div className="text-sm leading-5 text-gray-500">Ciledug</div>
                    </td>

                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                      <span
                        className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Active</span>
                    </td>

                    <td
                      className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5 text-gray-500">
                      Pegawai</td>

                    <td
                      className="px-6 py-4 whitespace-no-wrap text-right border-b border-gray-200 text-sm leading-5 font-medium">
                      <a href="#" className="text-indigo-600 hover:text-indigo-900">Edit</a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </main>

  )
}

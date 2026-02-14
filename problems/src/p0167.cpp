#include <iostream>

int main()
{
    std::cout << "Enter: ";

    char ch{};
    std::cin >> ch;
    std::cout << ch << '\n';

    std::cin >> ch;
    std::cout << ch << '\n';

    return 0;
}

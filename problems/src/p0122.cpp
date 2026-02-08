#include <iostream>

int main()
{
    int n{ 1 };

    std::cout << n << ' ';
    std::cout << (sizeof(n++) == sizeof(int)) << ' ';
    std::cout << n << '\n';

    return 0;
}

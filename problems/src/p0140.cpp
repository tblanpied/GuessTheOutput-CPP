#include <cstddef>
#include <iostream>

int main()
{
    std::size_t n{0};

    std::cout << (n - 1 > n) << ' ';
    std::cout << (n - 1 == static_cast<std::size_t>(-1)) << '\n';
}

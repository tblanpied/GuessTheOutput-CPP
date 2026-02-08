#include <cstddef>
#include <iostream>

int main()
{
    std::size_t s{2};
    int i{-1};

    std::cout << (i < 1) << ' ' << (i < s) << '\n';
}

